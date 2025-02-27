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
  "https://youtube-app-sanju-vert.vercel.app",
  "https://react-frontend-psi-ashen.vercel.app/",
  "http://localhost:3000/",
  "https://prototype-verceldeployment-client.vercel.app",
  "https://prototype-verceldeployment-server.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
