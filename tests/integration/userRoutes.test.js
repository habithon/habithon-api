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

  it("Validate the user credentials", async () => {
    const res = await request(api).post("/user/login").send({
      username: "ladybird",
      password: "qwerty",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.success).toBe(true);
  });

  it("Throw error if can't find user", async () => {
    const res = await request(api).post("/user/login").send({
      username: "ladybir",
      password: "qwerty",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.success).toBe(false);
  });

  it("Throw error if can't validate credentials", async () => {
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

  it("Throw error if it can't create user", async () => {
    const res = await request(api).post("/user/register").send({
      usernam: "ladybird",
      password: "qwerty",
    });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
    expect(res.body.success).toBe(false);
  });
});
