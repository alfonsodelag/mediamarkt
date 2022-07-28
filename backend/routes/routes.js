const userRoutes = require("./users");

const appRouter = (app, fs) => {
  app.get("/", (req, res) => {
    res.send("Development API Server");
  });

  userRoutes(app, fs);
};

module.exports = appRouter;
