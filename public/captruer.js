class Captruer {
	constructor() {
		this.canvas_elm = document.getElementById("defaultCanvas0");
		if (this.canvas_elm == undefined) {
			console.log("gan");
		}

		this.socket = io();

		this.data = [];
	}

	captrue() {
		let data = {
			num: frameCount,
			base64data: canvas_elm.toDataURL("image/png", 1).replace(/^data:image\/png;base64,/, ""),
		};

		socket.emit("data", JSON.stringify(data));
	}

	captrueSync() {
		let data = {
			num: frameCount,
			base64data: canvas_elm.toDataURL("image/png", 1).replace(/^data:image\/png;base64,/, ""),
		};

		this.data.push(data);
	}

	end() {
		for (let one of this.data) {
			socket.emit("data", JSON.stringify(one));
		}
	}
}
