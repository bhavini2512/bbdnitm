const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public")); // serve frontend

app.post("/api", (req, res) => {
    const data = req.body;  // ✅ USE THIS
    console.log(data);
    res.send("OK");
});

// Save complaint
app.post("/submit-complaint", (req, res) => {
    const data = req.body;

    let complaints = [];

    if (fs.existsSync("data.json")) {
        complaints = JSON.parse(fs.readFileSync("data.json"));
    }

    complaints.push(data);

    fs.writeFileSync("data.json", JSON.stringify(complaints, null, 2));

    res.send({ message: "Complaint submitted successfully!" });
});

app.get("/complaints", (req, res) => {
    try {
        const data = fs.readFileSync("data.json", "utf-8");
        const complaints = data ? JSON.parse(data) : [];
        res.json(complaints);
    } catch (err) {
        res.status(500).send("Error reading data");
    }
});

app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/admin.html");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});