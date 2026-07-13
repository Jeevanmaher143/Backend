const express = require("express");
const cors = require("cors");
const compression = require("compression");

const app = express();

// gzip every response — big win for JSON + text payloads
app.use(compression());
app.use(cors());
app.use(express.json());

// Health check for uptime pings (keeps Render free instance warm)
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// Cache-Control for PUBLIC read-only GET endpoints.
// Browsers/Vercel edge can serve cached data instead of re-hitting Render.
app.use((req, res, next) => {
  const publicGet =
    req.method === "GET" &&
    /^\/api\/(notices|schemes|gallery|development|village|contacts)/.test(req.path);
  if (publicGet) {
    // cache 60s, serve stale up to 5 min while revalidating
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  }
  next();
});

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
