import database from "../src/models";
import { UPLOAD_COLLECTION_PATH } from "../constants/server.env.json";
import {
  PAGINATION_LIMIT,
  FEEDBACK_PER_PAGE
} from "../constants/controller.env.json";
import base64Img from "base64-img";

const DEFAULT_FIND_ALL_ORDER = ['starRating', 'DESC'];
const Sequelize = require('sequelize');
const { sequelize } = database;

class StudioService {
  static async getAllStudios(page) {
    try {
      const studiosList = await database.studios.findAll({
        limit: PAGINATION_LIMIT,
        offset: page * PAGINATION_LIMIT - PAGINATION_LIMIT,
        where: { status: "ACTIVATED" },
        attributes: [
          "id",
          "name",
          "description",
          "starRating",
          "reviewsRating"
        ],
        order: [
          DEFAULT_FIND_ALL_ORDER
        ],
        include: [
          { model: database.addresses, attributes: ["city"] },
          {
            limit: PAGINATION_LIMIT,
            model: database.photo,
            attributes: ["photo_url"]
          }
        ]
      });
      const pageCount = await database.studios.count() / PAGINATION_LIMIT;
      return [{ studiosList: studiosList, pageCount: Math.ceil(pageCount) }];
    } catch (e) {
      throw e;
    }
  }

  static async getStudiobyId(id) {
    try {
      const response = await database.studios.findByPk(id, {
        include: [
          { model: database.addresses },
          { model: database.photo },
          {
            model: database.rooms,
            include: [

              { model: database.room_type },
              { model: database.room_comforts,
                    include: [{ model: database.comforts }]
              },
              { model: database.orders,
                include: [{model: database.feedbacks,}],
                limit: 1,
              }
            ],
          }
        ]
      });
          response.photos.map(async photo => photo.photo_url =
          await base64Img.base64Sync(`${UPLOAD_COLLECTION_PATH}${photo.photo_url}`));
      return response;
    } catch (e) {
      throw e;
    }
  }

  static async getFeedbackbyStudioId(id,page,star) {
    try {
      let whereStatement = `studios.id=${id}`;
      if (star){whereStatement =`studios.id=${id} and feedbacks.star=${star}`}
      const feedback = await sequelize.query(
          `SELECT feedbacks.id, feedbacks.star, feedbacks.message, feedbacks.created_at FROM studios 
      JOIN rooms on studios.id=rooms.studio_id JOIN orders on orders.room_id=rooms.id 
      JOIN feedbacks on feedbacks.order_id=orders.id WHERE ${whereStatement}
      ORDER BY created_at DESC LIMIT ${FEEDBACK_PER_PAGE} OFFSET (${page} - 1) * ${FEEDBACK_PER_PAGE}`,
          { type:Sequelize.QueryTypes.SELECT});
      const feedbackCount = await sequelize.query(
          `SELECT COUNT(feedbacks.id) FROM studios 
      JOIN rooms on studios.id=rooms.studio_id JOIN orders on orders.room_id=rooms.id 
      JOIN feedbacks on feedbacks.order_id=orders.id WHERE ${whereStatement}`,
          { type:Sequelize.QueryTypes.SELECT});
      return [{
        feedback: feedback,
        feedbackCount: feedbackCount,
      }];
    }
     catch (e) {
     console.log( e);
     throw e;
    }
  }

  static async addStudio(studio) {
    try {
      return await database.studios.create(studio);
    } catch (e) {
      throw e;
    }
  }
}

export default StudioService;
