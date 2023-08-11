const express = require("express");
const app = express();

const userRoutes = require("./user");
const forumRoutes = require("./forum");
const newsRoutes = require("./news");
const bookRoutes = require("./book");
const videoRoutes = require("./video");
const marketRoutes = require("./market");
const treatmentRoutes = require("./treatment");
const topicRoutes = require("./topic");

app.use("/api/user", userRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/treatment", treatmentRoutes);
app.use("/api/topic", topicRoutes);

module.exports = app; 

