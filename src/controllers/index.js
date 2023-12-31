const express = require("express");
const app = express();

const userRoutes = require("./user");
const labRoutes = require("./labAssistant");
const forumRoutes = require("./forum");
const newsRoutes = require("./news");
const bookRoutes = require("./book");
const videoRoutes = require("./video");
const marketRoutes = require("./market");
const treatmentRoutes = require("./treatment");
const topicRoutes = require("./topic");
const farmerRoutes = require("./farmer");
const tankRoutes = require("./tank");
const stateDistrictRoutes = require("./stateDistrict");
const fishTestRoutes = require("./fishTest");
const waterTestRoutes = require("./waterTest");
const pcrTestRoutes = require("./pcrTest");
const soilTestRoutes = require("./soilTest");
const feedTestRoutes = require("./feedTest");
const shrimpTestRoutes = require("./shrimpTest");
const planktonTestRoutes = require("./planktonTest");
const cultureTestRoutes = require("./cultureTest");
const allTestRoutes = require("./allTest");


app.use("/api/user", userRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/treatment", treatmentRoutes);
app.use("/api/topic", topicRoutes);
app.use("/api/farmer",farmerRoutes);
app.use("/api/tank", tankRoutes);
// Sample Registration
app.use("/api/fish", fishTestRoutes);
app.use("/api/water", waterTestRoutes);
app.use("/api/pcr", pcrTestRoutes);
app.use("/api/feed", feedTestRoutes);
app.use("/api/soil", soilTestRoutes);
app.use("/api/shrimp", shrimpTestRoutes);
app.use("/api/plankton", planktonTestRoutes);
app.use("/api/culture", cultureTestRoutes);
app.use("/api/test", allTestRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/location", stateDistrictRoutes);

module.exports = app; 

