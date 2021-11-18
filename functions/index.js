const functions = require("firebase-functions");
const express = require("express");

const admin = require("firebase-admin")

const app = express();
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

app.get("/hello-world", (req, res) => {
    return res.status(200).json({ message: "Hello World" });
});

app.use(require("./routes/users.routes"));

exports.app = functions.https.onRequest(app);