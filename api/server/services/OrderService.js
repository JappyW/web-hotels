import database from "../src/models";
import Email from "../services/EmailsService";
import { WEB_UI_MAIL } from "../constants/config.env.json";
const { Op } = require("sequelize");
const PAID = "PAID";
const COMPLETED = "COMPLETED";

class OrderService {
  static async getAllOrders() {
    try {
      return await database.orders.findAll();
    } catch (e) {
      throw e;
    }
  }

  static async addOrder(order) {
    try {
      return await database.orders.create(order);
    } catch (e) {
      throw e;
    }
  }

  static async getOrdersbyUserId(id) {
    try {
      let userOrders = await database.orders.findAll({
        where: { userId: id },
        attributes: ["id", "start_date", "finish_date"],
        order: [["finish_date", "DESC"]],
        include: [
          {
            model: database.rooms,
            attributes: ["studio_id"],
            include: [
              {
                model: database.room_type,
                attributes: ["name"]
              },
              {
                model: database.studios,
                attributes: ["name"]
              }
            ]
          }
        ]
      });

      let userFeedbacks = await database.feedbacks.findAll({
        where: { user_id: id }
      });

      const checkAvailability = function(arr, val) {
        return arr.some(element => val === element.order_id);
      };

      let userOrdersWithoutFeedbacks = userOrders.filter(
        order => !checkAvailability(userFeedbacks, order.id)
      );

      return userOrdersWithoutFeedbacks;
    } catch (e) {
      throw e;
    }
  }

  static async getOrdersbyOrderId(id) {
    try {
      let userOrders = await database.orders.findByPk(id, {
        include: [
          {
            model: database.rooms,
            include: [
              {
                model: database.room_type,
                attributes: ["name"]
              },
              {
                model: database.studios,
                attributes: ["name"],
                attributes: ["bank_account"]
              }
            ]
          }
        ]
      });

      return userOrders;
    } catch (e) {
      throw e;
    }
  }

  static async sendReminderAboutOrder(email, html, subject) {
    try {
      new Email.Builder(WEB_UI_MAIL)
        .setReceiver(email)
        .setHTML(html)
        .setSubject(subject)
        .build();
    } catch (e) {
      console.error(e);
    }
  }

  static getNumberOfDaysFromTwoDates(startDate, finishDate) {
    const miliseconds = Math.abs(new Date(finishDate) - new Date(startDate));
    const days = parseInt(Math.floor(miliseconds / 3600000 / 24));
    return days;
  }

  static async updateOrderStatusToPaid(order) {
    try {
      return await database.orders.update(
        { status: PAID },
        { where: { id: order.id } }
      );
    } catch (e) {
      console.error(e);
    }
  }

  static async changeOrderStatusToComplete() {
    const todayDate = new Date();
    return await database.orders.update(
      { status: COMPLETED },
      {
        where: {
          status: PAID,
          finishDate: {
            [Op.lt]: todayDate
          }
        }
      }
    );
  }
}

export default OrderService;
