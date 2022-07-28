const userRoutes = (app, fs) => {
  const dataPath = "./data/users.json";

  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  // GET ALL USERS
  app.get("/users", (req, res) => {
    readFile((data) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }, true);
  });

  // POST NEW USER
  app.post("/users", (req, res) => {
    // readFile((data) => {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.send(data);
    // }, true);
    console.log("nueva data", req.body);

    readFile((data) => {
      const userIndex = req.body["id"];
      data = [...data, req.body];
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(201).send(`user id:${userIndex} created`);
      });
    }, true);
  });

  // UPDATE
  app.put("/users/:id", (req, res) => {
    readFile((data) => {
      const userId = req.params["id"];
      let newData = data.filter(({ id }) => id != userId);
      newData = [...newData, req.body];
      writeFile(JSON.stringify(newData, null, 2), () => {
        res.status(200).send(`users id:${userId} updated`);
      });
    }, true);
  });

  // DELETE
  app.delete("/users/:id", (req, res) => {
    readFile((data) => {
      const userId = req.params["id"];
      const newData = data.filter(({ id }) => id != userId);
      writeFile(JSON.stringify(newData, null, 2), () => {
        res.status(200).send(`users id:${userId} removed`);
      });
    }, true);
  });
};

module.exports = userRoutes;
