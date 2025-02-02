const express = require("express");
const si = require("systeminformation");
const Resource = require("../models/Resource");

const router = express.Router();

router.get("/", async (req, res) => {
  const cpu = await si.currentLoad();
  const memory = await si.mem();
  const disk = await si.fsSize();
  const network = await si.networkStats();

  const resourceData = {
    cpu: cpu.currentLoad,
    ram: (memory.active / memory.total) * 100,
    disk: disk[0].use,
    network: network[0].rx_sec / 1024,
  };

  await new Resource(resourceData).save();

  res.json(resourceData);
});

module.exports = router;
