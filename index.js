const db = require("./Database/Connect");

const express = require("express");
const session = require("express-session");

const port = 3001;

const app = express();

const SESSION_SECRET = "secret"; // TODO: Don't hardcode

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use("/auth", require("./Route/auth"));
app.use("/university", require("./Route/university"));

db.authenticate().then(() => {
  app.listen(port, () => console.log(`Server running on ${port}`));
});
