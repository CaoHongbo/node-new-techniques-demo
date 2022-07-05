const createRouter = require("koa-bestest-router");

const routerMiddleware = createRouter({
  GET: {
    "/pie": async (context, next) => {
      context.body = "Yay pie!";
    },
    "/cake/:flavor": async (context, next) => {
      context.body = `I like ${context.params.flavor} cake`;
    },
  },
  POST: {
    "/cake/:flavor": async (context, next) => {
      someDb.addFlavor(context.params.flavor);
    },
  },
});

// koaApp.use(routerMiddleware)
// export default routerMiddleware;
module.exports = routerMiddleware;
