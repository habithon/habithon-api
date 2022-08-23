const { destroy } = require("../../controllers/goals");

describe("user endpoints", () => {
  let api;

  beforeAll(async () => {
    api = app.listen(6000, () =>
      console.log("Test server running on port 6000")
    );
  });

  afterAll(async () => {
    console.log("Gracefully stopping test server");
    await api.close();
  });

  it("Should return a list of all goals in database", async () => {
    const user = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });

    const res = await request(api)
      .get("/goals")
      .set({ Authorization: user.body.token });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  it("Throw error if route is wrong", async () => {
    const user = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });

    const res = await request(api)
      .get("/goal")
      .set({ Authorization: user.body.token });
    expect(res.statusCode).toEqual(404);
  });

  it("Throw error if route it's different", async () => {
    const user = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });

    const res = await request(api)
      .get("/goals/user")
      .set({ Authorization: user.body.token });
    expect(res.statusCode).toEqual(500);
  });

  it("Throw error if there's no authorization", async () => {
    const res = await request(api).get("/goals/user");

    expect(res.statusCode).toEqual(401);
  });

  it("Throw error if authentication is wrong", async () => {
    const user = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });

    const res = await request(api)
      .get("/goals")
      .set({ Authorization: user.body });
    expect(res.statusCode).toEqual(401);
  });

  it("Should return a list of all goals in database", async () => {
    const user = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });

    const res = await request(api)
      .get("/goals/12")
      .set({ Authorization: user.body.token });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  it("Throw an error when user don't have an specific goal", async () => {
    const user = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });

    const res = await request(api)
      .get("/goals/7")
      .set({ Authorization: user.body.token });
    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  it("Throw error if habit can't be created", async () => {
    const user = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });

    const res = await request(api)
      .post("/goals")
      .send({
        habi: "sleep",
        frequency: "daily",
      })
      .set({ Authorization: user.body.token });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("error");
  });

  it("Throw error if habit can't be destroy", async () => {
    const user = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });

    const res = await request(api)
      .delete("/goals/1")
      .set({ Authorization: user.body.token });

    expect(res.statusCode).toEqual(404);
  });

  it("Throw error if it can't update a habit", async () => {
    const user = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });

    const res = await request(api)
      .put("/goals/1")
      .send({
        streak: 1,
      })
      .set({ Authorization: user.body.token });

    expect(res.statusCode).toEqual(404);
  });

  // it("should create a new habit", async () => {
  //   const user = await request(api).post("/user/login").send({
  //     username: "ladybird",
  //     password: "qwerty",
  //   });

  //   const res = await request(api)
  //     .post("/goals")
  //     .send({
  //       habit: "sleep",
  //       frequency: "daily",
  //     })
  //     .set({ Authorization: user.body.token });

  //   expect(res.statusCode).toEqual(201);
  //   expect(res.body).toHaveProperty("habit");
  // });

  // it("should destroy a habit", async () => {
  //   const user = await request(api).post("/user/login").send({
  //     username: "ladybird",
  //     password: "qwerty",
  //   });

  //   const res = await request(api)
  //     .delete("/goals/15")
  //     .set({ Authorization: user.body.token });

  //   expect(res.statusCode).toEqual(204);
  // });

  // it("should update a habit", async () => {
  //   const user = await request(api).post("/user/login").send({
  //     username: "ladybird",
  //     password: "qwerty",
  //   });

  //   const res = await request(api)
  //     .put("/goals/13")
  //     .send({
  //       streak: 1,
  //     })
  //     .set({ Authorization: user.body.token });

  //   expect(res.statusCode).toEqual(201);
  // });
});
