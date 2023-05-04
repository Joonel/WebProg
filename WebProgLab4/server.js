const express = require("express");
const axios = require("axios");
const app = express();
const port = process.argv[2] || 3000;

app.use(express.static("public"));

app.get("/api", async (req, res) => {
    try {
        const { keyword } = req.query;
        const response = await axios.get(
            `https://ll.thespacedevs.com/2.2.0/launch/?mode=list&search=${keyword}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error: Не вдалося отримати дані.");
    }
});

app.listen(port, () => {
    console.log(`Сервер прослуховує порт ${port}`);
});
