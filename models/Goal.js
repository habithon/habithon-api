const db = require("../dbConfig/connect");

module.exports = class Goal {
  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.habit = data.habit;
    this.streak = data.streak;
    this.frequency = data.frequency;
    this.last_completed = data.last_completed;
  }

  static showHabits(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await db.query(
          `SELECT *, NOW() as today FROM habit WHERE user_id = $1;`,
          [user_id]
        );

        const goal = userData.rows.map((a) => {
          this.calculateStreak(
            a.last_completed,
            new Date(),
            a.frequency,
            a.streak
          );
          return new Goal(a);
        });
        resolve(goal);
      } catch (err) {
        console.log(err);
        reject("Unable to locate user.");
      }
    });
  }

  static showOne(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await db.query(`SELECT * FROM habit WHERE id = $1;`, [
          id,
        ]);
        this.calculateStreak(
          userData.rows[0].last_completed,
          new Date(),
          userData.rows[0].frequency,
          userData.rows[0].streak
        );
        const goal = new Goal(userData.rows[0]);

        resolve(goal);
      } catch (err) {
        console.log(err);
        reject("Unable to locate user.");
      }
    });
  }

  static calculateStreak(lastCompleted, currentDate, frequency, streak) {
    const last = Date.parse(lastCompleted);
    const current = Date.parse(currentDate);
    let frequencyNumber = "";
    if (frequency == "daily") {
      frequencyNumber = 86400000;
    } else if (frequency == "weekly") {
      frequencyNumber = 604800000;
    } else {
      frequencyNumber = 2678400000;
    }

    if (last + frequencyNumber >= current) {
      console.log(streak);
    } else {
      console.log(0);
    }
  }

  static create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const goalData = await db.query(
          "INSERT INTO habit (user_id, habit, streak, frequency, last_completed) VALUES ($1, $2, $3, $4, NOW()) RETURNING *;",
          [data.user_id, data.habit, 0, data.frequency]
        );
        const habit = new Goal(goalData.rows[0]);

        resolve(habit);
      } catch (err) {
        reject("Habit could not be created");
      }
    });
  }

  update(id, streak) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.query(
          "UPDATE habit SET streak=$1 WHERE id = $2 RETURNING user_id",
          [id, streak]
        );
        resolve("Habit was updated");
      } catch (err) {
        reject("Habit could not be updated");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        await db.query("DELETE FROM habit WHERE id = $1 RETURNING user_id", [
          this.id,
        ]);
        resolve("Habit was deleted");
      } catch (err) {
        reject("Habit could not be deleted");
      }
    });
  }
};
