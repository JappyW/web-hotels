import database from "../src/models";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
import {
  PAGINATION_LIMIT,
  SEARCH_TIPS_LIMIT,
  MINIMAL_LEVENSHTEIN_DISTANCE,
} from "../constants/controller.env.json";
const levenshtein = require("js-levenshtein");
import base64Img from "base64-img";
import { UPLOAD_COLLECTION_PATH } from "../constants/server.env.json";

class SearchService {
  static removeDuplicates(arr) {
    return arr.reduce((unique, o) => {
      if (
        !unique.some((obj) => obj.label === o.label && obj.value === o.value)
      ) {
        unique.push(o);
      }
      return unique;
    }, []);
  }

  static removeDuplicates2(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return (
        arr
          .map((mapObj) => mapObj.dataValues.name)
          .indexOf(obj.dataValues.name) === pos
      );
    });
  }

  static sortOn(arr, prop) {
    arr.sort(function (a, b) {
      if (a[prop] < b[prop]) {
        return -1;
      } else if (a[prop] > b[prop]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  static async getStudiosbySearchCriteria(req, res) {
    const s_sdate = req.query.sdate;
    const s_fdate = req.query.fdate;
    const search_criteria = { [Op.iLike]: "%" + req.query.ss + "%" };
    const page = req.query.page;
    const s_offset = page * PAGINATION_LIMIT - PAGINATION_LIMIT;
    const s_limit = s_offset + PAGINATION_LIMIT;
    const studioOrder = ["starRating", "DESC"];
    const studioAttributes = [
      "id",
      "name",
      "description",
      "starRating",
      "reviewsRating",
    ];
    const addressesAttributes = ["city"];

    const photoAttributes = ["photo_url"];
    const amenities = req.body.amenities ? (req.body.amenities.length == 0 ? ["acoustic_grand_piano"] : req.body.amenities): ["acoustic_grand_piano"];
    console.log(amenities)
    let SearchDates = {
      [Op.or]: [
        {
          start_date: {
            [Op.gte]: new Date(s_sdate),
            [Op.lte]: new Date(s_fdate),
          },
        },
        {
          finish_date: {
            [Op.gte]: new Date(s_sdate),
            [Op.lte]: new Date(s_fdate),
          },
        },
      ],
    };

    try {
      let result = [{}];

      if (s_sdate == "" || s_fdate == "") {
        SearchDates = {};
      }

      result = await database.studios.findAll({
        order: [studioOrder],
        where: { status: "ACTIVATED" },
        attributes: studioAttributes,

        include: [
          {
            model: database.addresses,
            where: { city: search_criteria },
            attributes: addressesAttributes,
          },
          {
            model: database.photo,
            attributes: photoAttributes,
          },
          {
            model: database.rooms,
            required: true,
            include: [
              {
                model: database.room_type,
                where: { name: { [Op.substring]: req.query.room_type } },
              },

              {
                model: database.orders,
                required: false,
                where: SearchDates,
              },

              {
                model: database.room_comforts,
                required: true,
                include: [
                  {
                    model: database.comforts,
                    where: { name: {[Op.in]: amenities} },
                  },
                ],
              },
            ],
          },
        ],
      });
      let result2 = [{}];

      result2 = await database.studios.findAll({
        where: {
          name: search_criteria,
          status: "ACTIVATED",
        },
        order: [studioOrder],
        attributes: studioAttributes,
        include: [
          {
            model: database.addresses,
            attributes: addressesAttributes,
          },
          {
            model: database.photo,
            attributes: photoAttributes,
          },
          {
            model: database.rooms,
            required: true,
            include: [
              {
                model: database.room_type,
                where: { name: { [Op.substring]: req.query.room_type } },
              },

              {
                model: database.orders,
                required: false,
                where: SearchDates,
              },
              {
                model: database.room_comforts,
                required: true,
                include: [
                  {
                    model: database.comforts,
                    where: { name: {[Op.in]: amenities} },
                  },
                ],
              },
            ],
          },
        ],
      });

      const results0 = [...result, ...result2];

      results0.map(async (studio) => {
        studio.photos.splice(1, studio.photos.length - 1);
        if (studio.photos.length > 0) {
          studio.photos[0].photo_url = await base64Img.base64Sync(
            `${UPLOAD_COLLECTION_PATH}${studio.photos[0].photo_url}`
          );
        }
      });

      const results = Array.from(new Set(results0.map((a) => a.id))).map(
        (id) => {
          return results0.find((a) => a.id === id);
        }
      );

      if (page === undefined) {
        return results;
      }
      const pageCount = results.length / PAGINATION_LIMIT;
      return [
        {
          studiosList: results.slice(s_offset, s_limit),
          pageCount: Math.ceil(pageCount),
        },
      ];
    } catch (e) {
      throw e;
    }
  }

  static async getSearchTips(req, res) {
    const search_criteria = { [Op.iLike]: "%" + req.query.ss + "%" };
    let isNoExactResult = false;

    try {
      let searchResultsInAddresses = await database.addresses.findAll({
        where: { city: search_criteria },
        attributes: [["city", "name"]],
      });

      let searchResultsInStudiosNames = await database.studios.findAll({
        where: { name: search_criteria },
        attributes: ["name"],
      });

      let results = [
        ...this.removeDuplicates2(searchResultsInAddresses),
        ...this.removeDuplicates2(searchResultsInStudiosNames),
      ];

      if (results[0] === undefined) {
        isNoExactResult = true;
        let searchResultsInAddresses = await database.addresses.findAll({
          attributes: [["city", "name"]],
        });

        let searchResultsInStudiosNames = await database.studios.findAll({
          attributes: ["name"],
        });

        results = [
          ...this.removeDuplicates2(searchResultsInAddresses),
          ...this.removeDuplicates2(searchResultsInStudiosNames),
        ];
      }

      if (!!results[0]) {
        results.forEach(function (el) {
          const { name } = el.dataValues;
          el.distance = levenshtein(req.query.ss, name);
        });

        this.sortOn(results, "distance");

        if (isNoExactResult) {
          const filteredResults = await results.filter(
            (el) => el.distance < MINIMAL_LEVENSHTEIN_DISTANCE
          );
          if (!!filteredResults[0]) {
            return filteredResults;
          } else return [{}];
        }
        return results.slice(0, SEARCH_TIPS_LIMIT);
      } else return [{}];
    } catch (e) {
      throw e;
    }
  }
}

export default SearchService;
