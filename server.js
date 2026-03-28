const express = require("express");
const app = express();

app.use(express.json());

// Root Route (wichtig!)
app.get("/", (req, res) => {
    res.send("FTS API läuft!");
});

// Lizenz-Daten
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
    const owned = licenses.some(l => l.userId == userId && l.product == product);
    res.json({ owned });
});

// Port korrekt setzen für Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server läuft auf Port " + PORT));
