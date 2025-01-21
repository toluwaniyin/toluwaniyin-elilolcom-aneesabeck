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

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

//GET /api/trees endpoint
const tree1 = {
  _id: "tree1",
  tree_name: "study tree",
  image: "../treeicon.jpg",
};

const tree2 = {
  _id: "tree2",
  tree_name: "python tree",
  image: "../treeicon.jpg",
};

const tree3 = {
  _id: "tree3",
  tree_name: "c++ tree",
  image: "../treeicon.jpg",
};

const trees = [tree1, tree2, tree3];

router.get("/api/trees", (req, res) => {
  res.send(trees);
});

//POST /api/trees endpoint
//TO DO

//GET /api/streaks endpoint
router.get("/api/streak", (req, res) => {
  res.send(currentStreak);
});

//POST /api/streak endpoint
let currentStreak = 0;
let lastUpdatedDate = null;

router.post("/api/streak", (req, res) => {
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

    lastUpdatedDate = today; // Update the last updated date
  }

  res.send(currentStreak);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
