const Koa = require("koa");
const app = new Koa();

const router = require("./router");
const mongoClient = require("./clients/mongo");

const port = 3000;

app.use(router);

mongoClient
  .connect()
  .then((result) => {
    console.log(`MongoDB connect success`);
    app.listen(port, () => {
      console.log(`server run on ${port}`);
    });
  })
  .catch(console.error);
