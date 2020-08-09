const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const fs = require("fs");

app.use(express.static("public"));

io.on("connection", (socket) => {
	console.log("connected");
	socket.on("data", (data) => {
		data = JSON.parse(data);
		fs.writeFile("./output/" + data.num.toString() + ".png", data.base64data, "base64", function (err) {
			if (err) {
				console.log(err);
			}
		});
	});
	socket.on("disconnect", () => {
		console.log("disconnected");
		const { exec } = require("child_process");

		exec("ffmpeg -f image2 -i ./output/%d.png ./output/untitled.mp4", (err, stdout, stderr) => {
			if (err) {
				console.log(err);
				console.log(`stderr: ${stderr}`);
				return;
			} else {
				console.log("整活成功勒");
			}
		});
	});
});

http.listen(3000, () => {
	console.log("listening on http://localhost:3000");
});
