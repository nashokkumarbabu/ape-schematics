const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

module.exports = app => {
  if (process.env.DATABASE_URI) {
    app.use(
      session({
        secret: "ENTER YOUR SECRET HERE FOR SESSIONS",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 600000 },
        store: new MongoStore(
          { mongooseConnection: mongoose.connection },
          { useUnifiedTopology: true }
        ) // Use mong to store sessions
      })
    );
  } else {
    app.use(
      session({
        secret: "ENTER YOUR SECRET HERE FOR SESSIONS",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 600000 }
      })
    );
  }
};
