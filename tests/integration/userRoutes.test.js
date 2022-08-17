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

  it("Validate the user credentials", async () => {
    const res = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.success).toBe(true);
  });

  it("Should not return a list of all goals in database", async () => {
    const user = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "test",
    });

    console.log(user.body.token);
    const res = await request(api).get("/goals");
    expect(res.statusCode).toEqual(401);
    expect(res.body.success).toBe(false);
  });

  it("Should create a new user", async () => {
    const user = Math.random();
    const res = await request(api).post("/user/register").send({
      username: user,
      password: "test",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("body");
  });

  it("Throw error if user already exists", async () => {
    const res = await request(api).post("/user/register").send({
      username: "ladybird",
      password: "qwerty",
    });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
    expect(res.body.success).toBe(false);
  });
});
