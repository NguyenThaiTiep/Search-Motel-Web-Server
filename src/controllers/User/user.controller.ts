import { plainToClass } from "class-transformer";
import { UserUpdateDto } from "../../dto/User/user.dto";
import { UserService } from "../../models/User/user.model";

const getAll = async (req, res) => {
  let users = await UserService.getAll();
  res.send(users);
};
const getById = async (req, res) => {
  let id = req.params.id;
  let result = await UserService.getById(id);
  res.send(result);
};
const update = async (req, res) => {
  let user = req.body.user;
  let userUpdate = plainToClass(UserUpdateDto, user);
  let result = await UserService.update(userUpdate);
  return res.send(result);
};
const changeAvatar = async (req, res) => {
  let userId = req.body.userId;
  let imgId = req.body.imgId || undefined;

  let result = await UserService.changeAvatar(imgId, userId);
  return res.send(result);
};
export const UserController = { getAll, getById, changeAvatar, update };
