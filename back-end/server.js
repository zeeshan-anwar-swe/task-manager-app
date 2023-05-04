const taskRoutes = require("./routes/tasks-routes");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

//deploment code
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../front-end/build")));

	app.get("*", (request, response) => {
		response.sendFile(
			path.resolve(__dirname, "../", "front-end", "build", "index.html")
		);
	});
} else {
	app.get("/", (request, response) => {
		response.send("Home page");
	});
}

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT;
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on : ${PORT}`);
		});
	})
	.catch((error) => console.log(error));
