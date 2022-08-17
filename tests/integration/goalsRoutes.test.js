describe("user endpoints", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(async () => {
    api = app.listen(5000, () =>
      console.log("Test server running on port 5000")
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

    console.log(user.body.token);
    const res = await request(api)
      .get("/goals")
      .set({ Authorization: user.body.token });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  it("Should return one goal in database", async () => {
    const user = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });

    console.log(user.body.token);
    const res = await request(api)
      .get("/goals/1")
      .set({ Authorization: user.body.token });
    expect(res.statusCode).toEqual(200);
  });
});
