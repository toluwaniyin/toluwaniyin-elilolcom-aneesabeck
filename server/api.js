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
//const axios = require("axios");
//const OPENAI_API_KEY = "your-api-key-here";

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
  console.log(req.query.userId)
  User.findById(req.query.userId).then((user) => {
    console.log("User found")
    res.send(user);
  }).catch((err)=>{
    console.log("MongoDB couldn't find user")
  });
});

//GET request to get name of one tree
router.get("/tree_name", (req, res) => {
  console.log("id: ", req.query.treeId);
  Tree.findById(req.query.treeId).then((tree) => {
    console.log(tree);
    res.send(tree);
  });
});

//GET request all trees from the database and send back
router.get("/tree", (req, res) => {
  if (req.user) {
    Tree.find({userid: req.user._id}).then((trees) => res.send(trees));
  }
});
//   }
//   console.log("req", req.query.userId)
//   Tree.find({userid: req.query.userId}).then((trees) => {
//     res.send(trees);
//   });
// });

//POST request for new tree
router.post("/tree", async (req, res) => {
  const newTree = new Tree({
    name: req.body.name,
    image: "/treeIcon.jpg",
    userid: req.body.userid,
    progress: 0,
    learningTopic: req.body.learningTopic,
  });

  // opnai
  // const response = await axios.post(
  //   "https://api.openai.com/v1/chat/completions",
  //   {
  //     model: "gpt-4", // Specify the model (e.g., gpt-4)
  //     messages: [
  //       { role: "system", content: "You are a helpful assistant." },
  //       { role: "user", content: `I'm looking to learn about ${userInput}` },
  //     ],
  //     max_tokens: 60, // Limit the length of the response
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${OPENAI_API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  //parse response here


  console.log("added Tree");
  newTree.save().then((tree) => res.send(tree));
});

//GET REQUEST TO UPDATE PROGRESS OF TREE
router.get("/treeprogress", (req, res) => {
  Tree.findById(req.query.treeId).then((tree) => {
    res.send(tree);
  });
});

// //POST REQUEST to update progress of an existing tree
router.post("/treeprogress", (req, res) => {
  const { treeId, progress } = req.body;

  if (!treeId || progress === undefined) {
    return res.status(400).send("treeId and progress are required");
  }

  Tree.findByIdAndUpdate(
    treeId, // Find the tree by its ID
    { progress: progress }, // Update the progress field
    { new: true } // Return the updated document
  )
    .then((updatedTree) => {
      if (!updatedTree) {
        return res.status(404).send("Tree not found");
      }
      res.send(updatedTree); // Return the updated tree
    })
    .catch((err) => {
      console.error("Error updating progress:", err);
      res.status(500).send("Internal server error");
    });
});

//DELETE request
router.delete("/tree/:id", (req, res) => {
  console.log("DELETE request received");
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

//GET Progress

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

//GET request to fetch leaderboard data
router.get("/trees/leaderboard", async (req, res) => {
  try {
    const trees = await Tree.find();
    const validTrees = trees.filter(tree => tree.progress > 10);

    const userScores = validTrees.reduce((acc, tree) => {
      if (!acc[tree.userid]) {
        acc[tree.userid] = { userid: tree.userid, totalProgress: 0, treeCount: 0 };
      }
      acc[tree.userid].totalProgress += tree.progress;
      acc[tree.userid].treeCount += 1;
      return acc;
    }, {});

    const leaderboard = Object.values(userScores).sort((a, b) => {
      const scoreA = a.treeCount + a.totalProgress;
      const scoreB = b.treeCount + b.totalProgress;
      return scoreB - scoreA;
    });

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error.message);
    console.error(error.stack);
    res.status(500).send("Internal server error");
  }
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
