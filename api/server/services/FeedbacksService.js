import database from "../src/models";

class FeedbacksService {
  static async getAllFeedbacksbyUserId(userId) {
    try {
      return await database.feedbacks.findAll({
        where: { user_id: userId },
        attributes: ["id", "star", "message", "created_at"],

        include: [
          {
            model: database.orders,
            attributes: ["room_id"],
            include: [
              {
                model: database.rooms,
                attributes: ["room_type_id"],
                include: [
                  {
                    model: database.studios,
                    attributes: ["name"]
                  }
                ]
              }
            ]
          }
        ]
      });
    } catch (e) {
      throw e;
    }
  }

  static async addFeedback(feedback) {
    console.log(feedback);
    try {
      return await database.feedbacks.create(feedback);
    } catch (e) {
      throw e;
    }
  }
}

export default FeedbacksService;
