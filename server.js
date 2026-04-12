const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public")); // serve frontend

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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});