import OrderService from "../services/OrderService";
import { validationResult, body } from "express-validator";
import * as fieldValidator from "../validators/fieldValidator";
import { validateResponse, util } from "./ResponseWrapper";
import * as STATUS from "../constants/status.code.env";
import * as VALIDATION from "../constants/controller.env";
import UserService from "../services/UserService";
import { htmlForEmail } from "../utils/orderReminderHtml";
import cron from "node-cron";
import {
  getDayOfMonthFromDate,
  getMonthFromDate,
  getDayFromNow
} from "../utils/dateUtils";

const ORDER_FIELDS = {
  startDate: "startDate",
  finishDate: "finishDate",
  createdAt: "createdAt",
  roomId: "roomId",
  userId: "userId"
};
const LiqPay = require("liqpay");
const config = require("../src/config/config");
const SUCCESS_MESSAGE = "Order Added!";
const VALIDATE_MESSAGE = "Orders List";
const FOUND_ORDERS = "Found orders";
const CURRENCY = "UAH";
const VERSION = "3";
const REQUEST = "request";
const PAYACTION = "p2p";
const SUCCESS = "success";

class OrderController {
  static async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      validateResponse(orders.length, orders, VALIDATE_MESSAGE);
      return util.send(res);
    } catch (e) {
      util.setError(STATUS.BAD_REQUEST, e);
      return util.send(res);
    }
  }

  static checkOrderFields() {
    return [
      body(ORDER_FIELDS.startDate).custom(fieldValidator.checkDate),
      body(ORDER_FIELDS.finishDate).custom(fieldValidator.checkDate),
      body(ORDER_FIELDS.createdAt).custom(fieldValidator.checkDate),
      ...fieldValidator.checkInt(ORDER_FIELDS.roomId, { gt: 0 }),
      ...fieldValidator.checkInt(ORDER_FIELDS.userId, { gt: 0 })
    ];
  }

  static validate(method) {
    switch (method) {
      case VALIDATION.ADD_ORDER:
        return this.checkOrderFields();
      case VALIDATION.GET_ORDERS_BY_ID:
        return this.checkUserId();
    }
  }

  static async addOrder(req, res) {
    const errors = validationResult(req);
    const newOrder = req.body;
    if (!errors.isEmpty()) {
      res.status(STATUS.INCORRECT).json({ errors: errors.mapped() });
      return;
    }
    try {
      const createdOrder = await OrderService.addOrder(newOrder);
      const {
        id: orderId,
        userId,
        startDate,
        finishDate,
        roomId
      } = createdOrder.dataValues;
      const userData = await UserService.getUserById(userId);
      const { email, fullname } = userData.dataValues;
      const roomAndStudioInfo = await OrderService.getOrdersbyOrderId(orderId);
      const {
        room: {
          dataValues: {
            room_type: {
              dataValues: { name: roomTypeName }
            }
          }
        },
        room: {
          studio: {
            dataValues: { name: studioName }
          }
        }
      } = roomAndStudioInfo.dataValues;
      const dataForEmail = {
        userId,
        startDate,
        finishDate,
        roomId,
        email,
        fullname,
        roomTypeName,
        studioName
      };
      const subjectForEmail = "Studio Reservation Reminder!";
      const startDateDay = getDayOfMonthFromDate(startDate);
      const startDateMonth = getMonthFromDate(startDate);
      // initializing Cron Task
      const remindAboutOrderTask = cron.schedule(
        `* * 15 ${startDateDay - 1} ${startDateMonth} *`,
        () => {
          OrderService.sendReminderAboutOrder(
            dataForEmail.email,
            htmlForEmail(dataForEmail),
            subjectForEmail
          );
          remindAboutOrderTask.stop();
        },
        {
          scheduled: false
        }
      );
      if (startDateDay > getDayFromNow(1)) {
        remindAboutOrderTask.start();
      }

      util.setSuccess(STATUS.CREATED, SUCCESS_MESSAGE, createdOrder);
      return util.send(res);
    } catch (error) {
      util.setError(STATUS.BAD_REQUEST, error.message);
      return util.send(res);
    }
  }

  static async getOrdersbyUserId(req, res) {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        throw errors.mapped();
      }
      const orders = await OrderService.getOrdersbyUserId(req.params.id);
      validateResponse(!!orders, orders, FOUND_ORDERS);
      return util.send(res);
    } catch (error) {
      util.setError(STATUS.BAD_REQUEST, error);
      return util.send(res);
    }
  }

  static async getOrdersbyOrderId(req, res) {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        throw errors.mapped();
      }
      const orders = await OrderService.getOrdersbyOrderId(req.params.id);
      validateResponse(!!orders, orders, FOUND_ORDERS);
      return util.send(res);
    } catch (error) {
      util.setError(STATUS.BAD_REQUEST, error);
      return util.send(res);
    }
  }

  static checkUserId() {
    return [...fieldValidator.checkInt("id", { gt: 0 })];
  }

  static async payForOrder(req, res) {
    try {
      const requestData = req.body.data;
      requestData.card = requestData.card.replace(/\s/g, "");
      const order = await OrderService.getOrdersbyOrderId(
        req.body.data.orderId
      );
      const room = order.room;
      const studio = room.studio;
      const roomType = room.room_type.name;
      const description =
        studio.name +
        " " +
        roomType +
        " " +
        room.price +
        CURRENCY +
        "\n" +
        order.startDate +
        "   " +
        order.finishDate;

      const days = OrderService.getNumberOfDaysFromTwoDates(
        order.finishDate,
        order.startDate
      );
      const price = days * room.price;
      const accountNumber = studio.dataValues.bank_account;
      let liqpay = new LiqPay();
      liqpay.api(
        REQUEST,
        {
          public_key: config.test.payment.publicKey,
          action: PAYACTION,
          version: VERSION,
          amount: price,
          currency: CURRENCY,
          description,
          order_id: order.id + 200,
          receiver_card: accountNumber,
          card: requestData.card,
          card_exp_month: requestData.expiryMonth,
          card_exp_year: requestData.expiryYear,
          card_cvv: requestData.cvc
        },
        json => {
          switch (json.status) {
            case SUCCESS:
              OrderService.updateOrderStatusToPaid(order);
              util.setSuccess(STATUS.SUCCESS, json.status, json);
              break;
            default:
              util.setError(STATUS.FORBIDDEN, json.err_description);
              break;
          }
          return util.send(res);
        },
        (error, res) => {
          util.setError(STATUS.FORBIDDEN, error);
          return util.send(res);
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
}

export default OrderController;
