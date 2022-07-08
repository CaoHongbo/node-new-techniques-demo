const Koa = require("koa");
const app = new Koa();

const router = require("./router");
const { ApolloServer, gql } = require("apollo-server-koa");
const mongoClient = require("./clients/mongo");

const port = 3000;

app.use(router);

// mongoClient
//   .connect()
//   .then((result) => {
//     console.log(`MongoDB connect success`);
//     app.listen(port, () => {
//       console.log(`server run on ${port}`);
//     });
//   })
//   .catch(console.error);

/**
 * 在 typeDefs 里定义 GraphQL Schema
 *
 * 例如：我们定义了一个查询，名为 book，类型是 Book
 */
const typeDefs = gql`
  type Query {
    book: Book
    hello: String
  }

  enum BookStatus {
    DELETED
    NORMAL
  }

  type Book {
    id: ID
    name: String
    price: Float
    status: BookStatus
  }
`;

const BookStatus = {
  DELETED: 0,
  NORMAL: 1,
};
/**
 * 在这里定义对应的解析器
 *
 * 例如:
 *   针对查询 hello, 定义同名的解析器函数，返回字符串 "hello world!"
 *   针对查询 book，定义同名的解析器函数，返回预先定义好的对象（实际场景可能返回来自数据库或其他接口的数据）
 */
const resolvers = {
  // Apollo Server 允许我们将实际的枚举映射挂载到 resolvers 中（这些映射关系通常维护在服务端的配置文件或数据库中）
  // 任何对于此枚举的数据交换，都会自动将枚举值替换为枚举名，避免了枚举值泄露到客户端的问题
  BookStatus,

  Query: {
    hello: () => "hello world!",

    book: (parent, args, context, info) => ({
      name: "地球往事",
      price: 66.3,
      status: BookStatus.NORMAL,
    }),
  },
};

// 通过 schema、解析器、 Apollo Server 的构造函数，创建一个 server 实例
const server = new ApolloServer({ typeDefs, resolvers });
// 将 server 实例以中间件的形式挂载到 app 上
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`server run on ${port}`);
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
});
