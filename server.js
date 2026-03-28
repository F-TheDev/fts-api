const express = require("express");
const app = express();

app.use(express.json());

let licenses = [];

// Kauf speichern
app.post("/buy", (req, res) => {
    const { userId, product } = req.body;

    licenses.push({ userId, product });

    res.json({ success: true });
});

// Lizenz prüfen
app.get("/check-license", (req, res) => {
    const { userId, product } = req.query;

    const owned = licenses.some(
        l => l.userId == userId && l.product == product
    );

    res.json({ owned });
});

app.listen(3000, () => {
    console.log("FTS API läuft auf Port 3000");
});
