const { PythonShell } = require("python-shell");
const express = require("express");
const Resource = require("../models/Resource");

const router = express.Router();

router.get("/anomalies", async (req, res) => {
  const data = await Resource.find().limit(100);

  PythonShell.runString(JSON.stringify(data), { scriptPath: "./ml/anomaly_detection.py" }, (err, results) => {
    if (err) res.status(500).send(err);
    res.json(JSON.parse(results));
  });
});

module.exports = router;
