const { Router } = require("express");
const goalsController = require("../controllers/goals");
const verifyToken = require("../middleware/verifyToken");

const goalsRouter = Router();

goalsRouter.get("/", verifyToken, goalsController.show);
goalsRouter.get("/:id", verifyToken, goalsController.index);
goalsRouter.post("/", verifyToken, goalsController.create);
// goalsRouter.put("/:id", verifyToken, goalsController.update);
goalsRouter.delete("/:id", verifyToken, goalsController.destroy);
module.exports = goalsRouter;
