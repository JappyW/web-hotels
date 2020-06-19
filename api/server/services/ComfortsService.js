import database from "../src/models";

class ComfortsService {
  static async getAllComfortsbyStudioId(studioId) {
    console.log(studioId);
    try {
      const response = await database.studios.findAll(studioId, {
        where: { id: studioId },
        attributes: ["id"],
        include: [
          {
            model: database.rooms,
            include: [
              {
                model: database.room_comforts,
                include: [{ model: database.comforts }]
              }
            ]
          }
        ]
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  static async addComforts(comfort) {
    try {
      const response = await database.room_comforts.create(comfort);
      return response;
    } catch (e) {
      throw e;
    }
  }

  static async deleteComforts(room_id, comfort_id) {
    try {
      const response = await database.room_comforts.destroy({
        where: { room_id: room_id, comfort_id: comfort_id }
      });
      return response;
    } catch (e) {
      throw e;
    }
  }
}

export default ComfortsService;
