const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "12345678910";

const expiresIn = "1h";

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isLoginAuthenticated({ email, password }) {
    return (
        userdb.users.findIndex(
            (user) => user.email === email && user.password === password
        ) !== -1
    );
}

function isRegisterAuthenticated({ email }) {
    return userdb.users.findIndex((user) => user.email === email) !== -1;
}

server.post("/api/auth/register", (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    if (isRegisterAuthenticated({ email })) {
        const status = 401;
        const message = "Email ist bereits registriert";
        res.status(status).json({ status, message });
        return;
    }

    fs.readFile("./db.json", (err, data) => {
        if (err) {
            const status = 401;
            const message = err;
            res.status(status).json({ status, message });
            return;
        }
        data = JSON.parse(data.toString());

        let last_item_id = data.users[data.users.length - 1].id;

        data.users.push({
            id: last_item_id + 1,
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
        });
        let writeData = fs.writeFile(
            "./db.json",
            JSON.stringify(data),
            (err, result) => {
                if (err) {
                    const status = 401;
                    const message = err;
                    res.status(status).json({ status, message });
                    return;
                }
            }
        );
    });
    const access_token = createToken({ email, password });
    res.status(200).json({ access_token });
});

server.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!isLoginAuthenticated({ email, password })) {
        const status = 401;
        const message = "Email oder Passwort nicht korrekt.";
        res.status(status).json({ status, message });
        return;
    }
    const access_token = createToken({ email, password });
    res.status(200).json({ access_token });
});

server.get("/api/users", (req, res) => {
    const rawData = fs.readFileSync("./db.json");
    const users = JSON.parse(rawData);
    console.log(users);

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(users));
});

// Chats

server.post("/api/chats", (req, res) => {
    const {
        name,
        topic,
        user1,
        date,
    } = req.body;

    fs.readFile("./db.json", (err, data) => {
        if (err) {
            const status = 401;
            const message = err;
            res.status(status).json({ status, message });
            return;
        }
        data = JSON.parse(data.toString());

        let last_room_id = data.chats[data.chats.length - 1].room;

        data.chats.push({
            name: name,
            room: last_room_id + 1,
            user1: user1,
            user2: "",
            topic: topic,
            date: date,
            isOpen: true,
            isReady: false,
        });

        fs.writeFile(
            "./chats.json",
            JSON.stringify(data),
            (err, result) => {
                if (err) {
                    const status = 401;
                    const message = err;
                    res.status(status).json({ status, message });
                    return;
                }
            }
        );
    });

    res.status(200);
});


server.get("/api/chats", (req, res) => {
    const rawData = fs.readFileSync("./chats.json");
    const chats = JSON.parse(rawData);
    console.log(chats);

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(chats));
});

const port = 8080;

server.listen(port, () => {
    console.log(`Running Fake API json-server on port ${port}`);
});