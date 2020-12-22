import { plainToClass } from "class-transformer";
import { UserUpdateDto } from "../../dto/User/user.dto";
import { UserService } from "../../models/User/user.model";

const getAll = async (req, res) => {
  let users = await UserService.getAll();
  res.send(users);
};
const getProfile = async (req, res) => {
  let userId = res.locals.userId;
  let result = await UserService.getById(userId);
  return res.send(result);
};
const getById = async (req, res) => {
  let id = req.params.id;
  let result = await UserService.getById(id);
  res.send(result);
};
const getAccount = async (req, res) => {
  let id = res.locals.userId;
  let result = await UserService.getAccount(id);
  res.send(result);
};
const update = async (req, res) => {
  let user = req.body.user;
  let userId = res.locals.userId;
  let userUpdate = plainToClass(UserUpdateDto, user);
  userUpdate.id = userId;
  let result = await UserService.update(userUpdate);
  return res.send(result);
};
const changeAvatar = async (req, res) => {
  let userId = res.locals.userId;
  let imgId = req.body.imgId || undefined;

  let result = await UserService.changeAvatar(imgId, userId);
  return res.send(result);
};
export const UserController = {
  getAll,
  getById,
  changeAvatar,
  update,
  getProfile,
  getAccount,
};
