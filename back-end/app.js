const createError = require("http-errors");
const express = require("express");
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const user = require("./controller/test");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const conversation = require("./routes/conversations");
const messages = require("./routes/messagesRoute");
const follow = require("./routes/follow");
const search = require("./routes/search");
const userpostpostsRouter = require("./routes/userpost");
const payment = require("./routes/payment");
const cors = require("cors");
const post = require("./routes/post");
const { Socket } = require("socket.io");

var app = express();
var Port = 9001;
var Port2 = 8001;
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());

app.use(cookieParser());
app.use("/api/messages", messages);

app.use("/userposts", userpostpostsRouter);
app.use("/api/payment", payment);
app.use("/conversation", conversation);
app.use("/", indexRouter);
app.use("/userss", user.getAll);

app.use("/users", usersRouter);


app.use("/post", post);
app.use("/follow", follow);
app.use("/search", search);
io.on("connection", (socket) => {
  console.log("socket connected  ");

  socket.on("startConversation", (chatid) => {
    socket.join(chatid);

    socket.emit("connected");
    console.log("user in room " + chatid);
  });
  socket.on("message sent", (data) => {
    socket.to(data.chatroom).emit("receive", data);
  });
});

app.listen(Port, () => console.log(`app Server is listening to port ${Port}`));
server.listen(Port2, () =>
  console.log(`socket Server is listening to port ${Port2}`)
);

module.exports = app;
