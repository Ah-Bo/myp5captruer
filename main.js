const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const fs = require("fs");
const cheerio = require("cheerio");

let html_content = fs.readFileSync("public/index.html").toString();

const $ = cheerio.load(html_content);

$("body").append('<script src="' + "../node_modules/socket.io-client/dist/socket.io.js" + '"></script>\n');
$("body").append('<script src="' + "./capturer.js" + '"></script>');

fs.writeFileSync("public/index.html", $.html());

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

		exec("ffmpeg -f image2 -i ./output/%d.png untitled.mp4", (err, stdout, stderr) => {
			if (err) {
				console.log(err);
				console.log(`stderr: ${stderr}`);
				return;
			}
		});
	});
});

http.listen(3000, () => {
	console.log("listening on *:3000");
});
