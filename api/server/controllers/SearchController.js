import SearchService from "../services/SearchService";
import { validateResponse, util } from "./ResponseWrapper";

const STATUS = require("../constants/status.code.env");

class SearchController {
  static async getStudiosbySearchCriteria(req, res) {
    try {
      const studios = await SearchService.getStudiosbySearchCriteria(req, res);
      validateResponse(studios.length, studios, "Studios by Criteria");
      return util.send(res);
    } catch (e) {
      util.setError(STATUS.BAD_REQUEST, e);
      return util.send(res);
    }
  }
 
    static async getSearchTips(req, res) {
      try {
        const studios = await SearchService.getSearchTips(req, res);
        validateResponse(studios.length, studios, "Search Tips");
        return util.send(res);
      } catch (e) {
        util.setError(STATUS.BAD_REQUEST, e);
        return util.send(res);
      }
    }

}





export default SearchController;