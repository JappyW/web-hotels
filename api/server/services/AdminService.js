import database from "../src/models";
import Email from "../services/EmailsService";
import { WEB_UI_MAIL } from "../constants/config.env.json";
import { UPLOAD_COLLECTION_PATH } from "../constants/server.env.json";
import base64Img from "base64-img";

class AdminService {
  static async getListNotActiveStudios() {
    try {
      const notActiveStudios = await database.studios.findAll({
        where: { status: "INACTIVE" },
        attributes: ["id", "name", "starRating"],
        include: [
          {
            model: database.addresses,
            attributes: ["city", "house", "street"]
          },
          { model: database.users, attributes: ["email", "fullname"] },
          {
            model: database.photo,
            attributes: ["photo_url"]
          },
          {
            model: database.rooms,
            attributes: ["id"],
            include: [
              { model: database.orders,
                attributes: ["id"]
              }
            ],
          }
        ]
      });

      notActiveStudios.map(async studio => {
        studio.photos.splice(1, studio.photos.length - 1);
        if(studio.photos.length > 0){
          studio.photos[0].photo_url = await base64Img.base64Sync(
            `${UPLOAD_COLLECTION_PATH}${studio.photos[0].photo_url}`
          );
        }
      });

      const countNotActiveStudios = await database.studios.count({
        where: { status: "INACTIVE" }
      });

      return { notActiveStudios, countNotActiveStudios };
    } catch (e) {
      throw e;
    }
  }

  static async getListActiveStudios(status) {
    try {
      const listActiveStudios = await database.studios.findAll({
        where: { status: "ACTIVATED" },
        attributes: ["id", "name", "starRating"],
        include: [
          {
            model: database.addresses,
            attributes: ["city", "house", "street"]
          },
          { model: database.users, attributes: ["email", "fullname"] },
          {
            model: database.photo,
            attributes: ["photo_url"]
          },
          {
            model: database.rooms,
            attributes: ["id"],
            include: [
              { model: database.orders,
                attributes: ["id"]
              }
            ],
          }
        ]
      });

      listActiveStudios.map(async studio => {
        studio.photos.splice(1, studio.photos.length - 1);
        if(studio.photos.length > 0){
          studio.photos[0].photo_url = await base64Img.base64Sync(
            `${UPLOAD_COLLECTION_PATH}${studio.photos[0].photo_url}`
          );
        }
      });

      const countActiveStudios = await database.studios.count({
        where: { status: "ACTIVATED" }
      });

      return { listActiveStudios, countActiveStudios };
    } catch (e) {
      throw e;
    }
  }

  static async getListSuspendStudios() {
    try {
      const listSuspendStudios = await database.studios.findAll({
        where: { status: "WAITINGFORAPPROVAL" },
        attributes: ["id", "name", "starRating"],
        include: [
          {
            model: database.addresses,
            attributes: ["city", "house", "street"]
          },
          { model: database.users, attributes: ["email", "fullname"] },
          {
            model: database.photo,
            attributes: ["photo_url"]
          },
          {
            model: database.rooms,
            attributes: ["id"],
            include: [
              { model: database.orders,
                attributes: ["id"]
              }
            ],
          }
        ]
      });

      listSuspendStudios.map(async studio => {
        studio.photos.splice(1, studio.photos.length - 1);
        if(studio.photos.length > 0){
          studio.photos[0].photo_url = await base64Img.base64Sync(
            `${UPLOAD_COLLECTION_PATH}${studio.photos[0].photo_url}`
          );
        }
      });


      const countSuspendStudios = await database.studios.count({
        where: { status: "WAITINGFORAPPROVAL" }
      });

      return { listSuspendStudios, countSuspendStudios };
    } catch (e) {
      throw e;
    }
  }

  static async statusStudios(studio, params) {
    try {
      return await database.studios.update(
        { status: studio.status },
        { where: { id: studio.id } }
      );
    } catch (e) {
      throw e;
    }
  }

  static async sendEmailToOwner(email, message) {
    const TITLE = "Your studio was suspended!";
    try {
      new Email.Builder(WEB_UI_MAIL)
        .setReceiver(email)
        .setHTML(message)
        .setSubject(TITLE)
        .build();
    } catch (e) {
      console.error(e);
    }
  }

  static async getCauntInactiveStudios() {
    try {
      const countInactiveStudios = await database.studios.count({
        where: { status: "INACTIVE" }
      });
      return { countInactiveStudios };
    } catch (e) {
      console.error(e);
    }
  }
}

export default AdminService;
