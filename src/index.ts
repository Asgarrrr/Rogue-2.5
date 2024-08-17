import http from "http";
import { Server } from "socket.io";

import express from "express";
import ViteExpress from "vite-express";

const app = express();
const server = http.createServer(app);

app.get("/message", (_, res) => res.send("Hello from expressssss!"));

ViteExpress.listen(server, 3000, () => {
	console.log(`Server running at http://localhost:3000`);
});
