const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/ConnectDB");
const router = require("./routes/index");
const cookiesParser = require("cookie-parser");
const { app, server } = require("./socket/index");

// const app = express()
console.log(process.env.FRONTEND_URL);
// app.use(cors({
//     origin : process.env.FRONTEND_URL,
//     credentials : true
// }))

const PORT = 3010;

const corsWhitelist = [
  "https://react-frontend-psi-ashen.vercel.app",
  "http://localhost:3000",

];

const corsOptions = {
  
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(cookiesParser());

app.get("/", (request, response) => {
  response.json({
    message: "Server running at " + PORT,
  });
});

//api endpoints
app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("server running at " + PORT);
  });
});
