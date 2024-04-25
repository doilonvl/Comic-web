const connection = (socket) => {
  console.log("User connecting");

  socket.on("chat message", (msg) => {
    socket.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};
export default connection;
