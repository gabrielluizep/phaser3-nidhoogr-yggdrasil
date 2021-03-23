const express = require("express");

const app = express();
const server = require("http").Server(app);

const PORT = 3000;

app.use(express.static("../client/dist"));
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
