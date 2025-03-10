const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const routes = require("./routes");
const passport = require("passport");
require("./config/passport")();

const fetchAndSyncProducts = require("./sync/syncData");

const app = express();

// Connect to MongoDB early
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process on failure
  }
}
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI, // Your MongoDB connection URI
  collectionName: 'sessions',  // Store sessions in a custom collection
  ttl: 180 * 60,  // Set the session TTL to 3 hours
});
// Configure session middleware
async function setupSession() {
  const sessionMiddleware = session({
    secret: 'keyboardcat',  // Secure session secret
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,  // 1 day
      httpOnly: true,            // Protect against XSS attacks
      secure: false,  // Only use in production if using HTTPS
      sameSite: 'lax',           // To allow cross-site cookies (optional)
    },
  });
  return sessionMiddleware;
}

// Middleware and route setup
async function setupMiddlewareAndRoutes() {
  app.use(express.json());

  // CORS configuration
  app.use(
    cors({
      origin: "http://localhost:5173", 
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // Allow credentials
    })
  );

  // Session middleware
  const sessionMiddleware = await setupSession();
  app.use(sessionMiddleware);

  app.use(passport.initialize());
  app.use(passport.session());
  // Make session data available in views and log session info
  app.use((req, res, next) => {
    res.locals.session = req.session;

    next();
  });

  // Add other routes
  app.use("/api", routes);
}


// Start the server
async function startServer() {
  await connectToDatabase();
  await setupMiddlewareAndRoutes();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Uncomment to sync products on startup
  // fetchAndSyncProducts();
}

// Initialize the application
startServer();
