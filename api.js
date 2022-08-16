const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/user");
const goalsRouter = require("./routers/goals");

const api = express();

api.use(cors());
api.use(express.json());

api.use("/user", userRouter);
api.use("/goals", goalsRouter);

module.exports = api;
