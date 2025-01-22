/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Tree = require("./models/tree");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

//GET request for streaks-returning whole user back
router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

//GET request all trees from the database and send back
router.get("/tree", (req, res) => {
  Tree.find({}).then((trees) => {
    res.send(trees);
  });
});

//POST request
router.post("/tree", (req, res) => {
  const newTree = new Tree({
    name: req.body.name,
    image: "/treeIcon.jpg"
  });
  console.log("added Tree")
  newTree.save().then((tree) => res.send(tree));
});

//DELETE request
router.delete("/tree/:id", (req, res) => {
  const treeId = req.params.id;

  Tree.findByIdAndDelete(treeId)
    .then((deletedTree) => {
      if (deletedTree) {
        console.log(`Tree with ID ${treeId} deleted successfully.`);
        res.status(200).send({ message: "Tree deleted successfully." });
      } else {
        console.log(`Tree with ID ${treeId} not found.`);
        res.status(404).send({ error: "Tree not found." });
      }
    })
    .catch((err) => {
      console.error(`Error deleting tree with ID ${treeId}:`, err);
      res.status(500).send({ error: "Failed to delete tree." });
    });
});


router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|



//POST /api/trees endpoint
//TO DO

//POST /api/streak endpoint

//POST REQUEST FOR STREAK
router.post("/streak", (req, res) => {
  const today = new Date().toDateString();

  if (lastUpdatedDate !== today) {
    //yesterday is one day beefore today
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastUpdatedDate && new Date(lastUpdatedDate).toDateString() === yesterday.toDateString()) {
      // Increment streak
      currentStreak += 1;
    } else {
      // Reset streak
      currentStreak = 1;
    }
    User.findByIdAndUpdate(req.user._id, { streak: currentStreak, lastUpdatedDate: today });
  }

  res.send(currentStreak);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
