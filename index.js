const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

const server = require("http").createServer(app);

const { Client } = require('pg');

// clients will also use environment variables
// for connection information
const client = new Client({
    host: "postgres",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "scaffold"
});

client.connect().then(() => console.log("success"))
    .catch((err) => { throw err; });

var PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log(`Server running at http://127.0.0.1:${PORT}`);

app.get("/", (req, res) => res.send("Hello world"));

app.get("/ping", async (req, res) => {
    var result = await client.query("SELECT 1 + 1")
        .then(data => data)
        .catch(err => { 
            throw err;
        });

    res.send({result});
});
