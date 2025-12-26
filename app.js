const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/village", require("./routes/villageRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/admin/services", require("./routes/adminServiceRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/admin/dashboard", require("./routes/adminDashboardRoutes"));
app.use("/api/schemes", require("./routes/schemeRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/development", require("./routes/developmentRoutes"));


module.exports = app;
