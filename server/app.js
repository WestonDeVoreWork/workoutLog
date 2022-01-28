require("dotenv").config();
const Express = require('express');
const db = require("./db")

const app = Express();

app.use(require("./middleware/headers"));

const controllers = require("./controllers");
const bcrypt = require("bcryptjs");

app.use(Express.json());

app.use("/user", controllers.usercontroller)
app.use("/log", controllers.logcontroller)
app.use(require("./middleware/validate-jwt"));

db.authenticate()
    .then(() => db.sync())
    .then(() => {
        app.listen(3000, () =>
        console.log(`[Server: ] App is listening on Port ${3000}`)
        );
    })
    .catch(() => {
        console.log("[Server]: Server Crashed");
        console.error(err);
    });