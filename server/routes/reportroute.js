const exp = require('express');
const Tesseract = require("tesseract.js");
const Pothole = require('../models/Pothole');

const router = exp.Router();

router.post('/upload', async (req, res) => {
  try {
    const {submittedBy, location, description, severity, image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image (base64) is required" });
    }

    // Run OCR directly on base64 string
    const { data: { text } } = await Tesseract.recognize(image, "eng");
    console.log("OCR text:", text);

    // Regex to find lat/lon
    const latMatch = text.match(/(-?\d{1,2}\.\d{3,})/g);
    const lonMatch = text.match(/(-?\d{2,3}\.\d{3,})/g);

    let latitude = null, longitude = null;
    if (latMatch && lonMatch) {
      latitude = parseFloat(latMatch[0]);
      longitude = parseFloat(lonMatch[1]);
    }

    // Save directly to MongoDB
    const newPothole = new Pothole({
      submittedBy,
      image, // store as base64
      location,
      description,
      severity,
      latitude,
      longitude
    });

    await newPothole.save();

    res.json({ message: "Pothole reported successfully", newPothole });
  } catch (err) {
    console.error("OCR error:", err);
    res.status(500).json({ error: "Failed to process image" });
  }
});
router.get("/potholes", async (req, res) => {
  try {
    // Only return latitude and longitude fields
    const potholes = await Pothole.find({}, { latitude: 1, longitude: 1, _id: 0 });

    res.json(potholes); // This will be an array of { latitude, longitude }
  } catch (err) {
    console.error("Error fetching potholes:", err);
    res.status(500).json({ error: "Failed to fetch potholes" });
  }
});
router.get("/pothole/:id", async (req, res) => {
  try {
    const reported = await Pothole.find({submittedBy:req.params.id,status:"reported"}).lean();
const underRepair = await Pothole.find({submittedBy:req.params.id,status:"in progress"}).lean();
const finished = await Pothole.find({submittedBy:req.params.id,status:"completed"}).lean();

res.json({
  reported: reported.map(p => ({ ...p, id: p._id })),
  underRepair: underRepair.map(p => ({ ...p, id: p._id })),
  finished: finished.map(p => ({ ...p, id: p._id }))
});

  } catch (err) {
    console.error("Error fetching pothole:", err);
    res.status(500).json({ error: "Failed to fetch pothole" });
  }
});

module.exports = router;
