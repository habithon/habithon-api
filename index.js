const api = require("./api");

api.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`);
});
