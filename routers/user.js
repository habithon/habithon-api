const { Router } = require("express");
const userController = require("../controllers/user");

const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
// userRouter.post("/reset", userController.reset);

module.exports = userRouter;
