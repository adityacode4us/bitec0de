import { NextFunction, Request, Response } from "express";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import Contacts from "../../models/Contacts.js";
import { Model, Op } from "sequelize";

const IdentifyContactsController = {
  async identifyContacts(req: Request, res: Response, next: NextFunction) {},
};

export default IdentifyContactsController;
