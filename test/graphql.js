const axios = require("axios").default;

QUnit.module("graphql");

QUnit.test("graphql test", async (assert) => {
  const res = await axios.post("http://localhost:3000/graphql?query=Book", {
    query: `query {
        book {
          id
          name
          price
          status
        }
        hello
      }`,
  });
  console.log(res.data);
  assert.equal(3, 3);
});
