const db = require("./Database/Connect");

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

// TODO: Don't hardcode
const CORS_ORIGIN = "http://localhost:3000";
const SESSION_SECRET = "secret";

const PORT = 3001;

app.use(express.json());

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use("/auth", require("./Route/auth"));
app.use("/favorites", require("./Route/favorites"));
app.use("/university", require("./Route/university"));

db.authenticate().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
