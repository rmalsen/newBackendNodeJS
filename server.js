const http = require("http");
require("dotenv").config({ path: "dot.env" });
const app = require("./app/app");

http.createServer(app).listen(process.env.port, () => {
  console.log(`Sever is listening on port: ${process.env.port}`);
});
