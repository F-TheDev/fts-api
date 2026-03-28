const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Test Root Route
app.get("/", (req, res) => {
    res.send("FTS API läuft!");
});

// Datenstruktur: { userId, product, key }
let licenses = [];

// Funktion: Key generieren
function generateKey() {
    return "FTS-" + Math.random().toString(36).substring(2,10).toUpperCase();
}

// Ingame Kauf speichern
app.post("/buy", (req, res) => {
    const { userId, product } = req.body;
    const key = generateKey();
    licenses.push({ userId, product, key });
    console.log(`Neuer Kauf: ${userId} -> ${product} | Key: ${key}`);
    res.json({ success: true, key });
});

// Lizenz check
app.get("/check-license", (req, res) => {
    const { userId, product } = req.query;
    const owned = licenses.some(l => l.userId == userId && l.product == product);
    res.json({ owned });
});

// API für Hub / Website
app.get("/my-products", (req, res) => {
    const { userId } = req.query;
    const userProducts = licenses.filter(l => l.userId == userId);
    res.json(userProducts);
});

// Port für Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server läuft auf Port " + PORT));
