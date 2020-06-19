import Router from "express";
import OrderController from "../controllers/OrderController";
import VALIDATION from "../constants/controller.env";
import PAY from "../constants/server.env.json";

const router = Router();

router.get("/", OrderController.getAllOrders);
router.post(
  "/add",
  OrderController.validate(VALIDATION.ADD_ORDER),
  OrderController.addOrder
);
router.get(
  "/:id",
  OrderController.validate(VALIDATION.GET_ORDERS_BY_ID),
  OrderController.getOrdersbyUserId
);
router.post("/pay", OrderController.payForOrder);

export default router;
