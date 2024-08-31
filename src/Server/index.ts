
import express from "express";;
import { Server } from "socket.io";
import { createServer } from "http";

import Dungeon from "./Stage/Dungeon";

const t = new Dungeon({
    width: 100,
    height: 100,
});


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
  	},
});

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.onAny((event, data) => {
        console.log("event:", event, "data:", data);
    });
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
});

httpServer.listen(3000, () => {
    console.log("listening on *:3000");
});

