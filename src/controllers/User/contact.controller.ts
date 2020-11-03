import { plainToClass } from "class-transformer";
import { count } from "console";
import { HandelStatus } from "../../config/HandelStatus";
import { ContactDto } from "../../dto/User/contact.dto";
import { ContactUserService } from "../../models/User/contact.model";
const getAll = async (req, res) => {
  res.send(200);
};
const create = async (req, res) => {
  let input = req.body.contact;
  let result = await ContactUserService.create(input);
  res.send(result);
};
const getByUserId = async (req, res) => {
  let id = req.params.id;
  let result = await ContactUserService.getContactByUserId(id);
  res.send(result);
};
const update = async (req, res) => {
  let contact = req.body.contact;
  if (!contact) return res.send(HandelStatus(400));
  let contactUpdate = plainToClass(ContactDto, contact);
  contactUpdate.userId = req.body.userId;
  let result = await ContactUserService.update(contactUpdate);
  return res.send(result);
};
const remove = async (req, res) => {
  let contactId = req.body.contactId;
  let userId = req.body.userId;
  let result = await ContactUserService.remove(contactId, userId);
  return res.send(result);
};
export const ContactController = {
  create,
  getByUserId,
  getAll,
  update,
  remove,
};
