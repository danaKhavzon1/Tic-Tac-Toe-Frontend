// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Babel from "next/babel";
export default function handler(req, res) {

const httpServer = require("http").createServer();
;
const io = require("socket.io")(httpServer, {
});

io.on("connection", (socket) => {
  socket.emit("hello", "world");
});

httpServer.listen(3000)
}