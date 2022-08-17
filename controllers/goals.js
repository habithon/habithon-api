const jwt = require("jsonwebtoken");

const Goal = require("../models/Goal");

async function show(req, res) {
  try {
    const userData = await jwt.decode(req.body.token);

    const habits = await Goal.showHabits(userData.user_id);

    res.status(200).json({
      success: true,
      habits: habits,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}

async function index(req, res) {
  try {
    const habit = await Goal.showOne(req.params.id);

    res.status(200).json({
      success: true,
      habit: habit,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
async function create(req, res) {
  try {
    const userData = await jwt.decode(req.body.token);
    req.body.user_id = userData.user_id;
    const habit = await Goal.create(req.body);

    res.status(201).json({
      success: true,
      habit: habit,
    });
  } catch (err) {
    res.status(422).json({
      success: false,
      error: err,
    });
  }
}

const update = async (req, res) => {
  try {
    const goal = await Goal.showOne(req.params.id);
    const update = await goal.update(goal.id, req.body.streak);
    res.status(201).send({ body: update, message: "updated" });
  } catch (e) {
    res.status(404).send({ message: "id not found" });
  }
};

async function destroy(req, res) {
  try {
    const habit = await Goal.showOne(req.params.id);
    await habit.destroy();

    res.status(204).end();
  } catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = { show, index, create, update, destroy };
