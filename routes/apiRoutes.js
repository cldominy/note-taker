const db = require("../db/db.json");
const fs = require("fs");
let id = db.length + 1;

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(db);
  });

  app.post("/api/notes", function (req, res) {
    req.body.id = ++id;
    for (let i = 0; i < db.length; i++) {
      console.log(db[i].id, id);
      if (db[i].id === id) {
        req.body.id = id++;
      }
    }
    db.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
      if (err) {
        throw err;
      }
      res.json(db);
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    console.log(req.params.id);
    const rowID = parseInt(req.params.id);
    console.log(rowID);
    for (let i = 0; i < db.length; i++) {
      if (db[i].id === rowID) {
        db.splice(i, 1);
      }
    }
    fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
      if (err) {
        throw err;
      }
      res.json(db);
    });
  });
};
