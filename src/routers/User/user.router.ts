import * as express from "express";
import { AvatarUserController } from "../../controllers/image/avatarUser.controller";
import { UserController } from "../../controllers/User/user.controller";

import { uploadAvatarUser } from "../../services/upload/upload";
// import { uploadAvatarUser } from "../../services/upload/upload.cloudinary";

let userRouter = express
  .Router()
  .get("/", UserController.getAll)
  .get("/account", UserController.getAccount)
  .get("/profile", UserController.getProfile)
  .get("/:id", UserController.getById)
  .put("/update", UserController.update)
  .post(
    "/changeAvatar",
    uploadAvatarUser.single("avatar"),
    AvatarUserController.create,
    UserController.changeAvatar
  );

export default userRouter;
