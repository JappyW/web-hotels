import AdminService from "../services/AdminService";
import { util } from "./ResponseWrapper";
import * as STATUS from "../constants/status.code.env";
import MESSAGES from "../constants/messages.env";

class AdminController {
  static async getListNotActiveStudios(req, res) {
    try {
      let studios = await AdminService.getListNotActiveStudios(); 
      util.setSuccess(STATUS.SUCCESS, MESSAGES.UTILS.SUCCESS, studios);
      return util.send(res);
    } catch (error) {
      util.setError(STATUS.BAD_REQUEST, error);
      return util.send(res);
    }
  }

  static async getListActiveStudios(req,res) {
    try {
      const studios = await AdminService.getListActiveStudios();
      util.setSuccess(STATUS.SUCCESS, MESSAGES.UTILS.SUCCESS, studios);
      return util.send(res);
    } catch (error) {
      util.setError(STATUS.BAD_REQUEST, error);
      return util.send(res);
    }
  }

  static async getListSuspendStudios(req, res) {
    try {
      const studios = await AdminService.getListSuspendStudios();
      util.setSuccess(STATUS.SUCCESS, MESSAGES.UTILS.SUCCESS, studios);
      return util.send(res);
    } catch (error) {
      util.setError(STATUS.BAD_REQUEST, error);
      return util.send(res);
    }
  }

  static async statusStudios(req, res) {
    try {
      const studios = await AdminService.statusStudios(req.body, req.params);
      util.setSuccess(STATUS.SUCCESS, MESSAGES.UTILS.SUCCESS, studios);
      return util.send(res);
    } catch (error) {
      util.setError(STATUS.BAD_REQUEST, error);
      return util.send(res);
    }
  }

  static async sendEmailToOwner(req,res) {
    try {
      await AdminService.sendEmailToOwner(req.body.email, req.body.message );
      const email = req.body.email
      util.setSuccess(STATUS.SUCCESS, MESSAGES.EMAIL.SUCCESS, email);
      return util.send(res);
    }catch (error) {
      util.setError(STATUS.BAD_REQUEST, error);
      return util.send(res);
    }
  }

  static async getCauntInactiveStudios(req,res) {
    try {
      const count = await AdminService.getCauntInactiveStudios();
      util.setSuccess(STATUS.SUCCESS, MESSAGES.UTILS.SUCCESS, count);
      return util.send(res);
    } catch (error) {
      util.setError(STATUS.BAD_REQUEST, error);
      return util.send(res);
    }
  }
}

export default AdminController;
