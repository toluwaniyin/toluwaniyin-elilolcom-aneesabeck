/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
require("dotenv").config();

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Tree = require("./models/tree");
const axios = require("axios");
const OPENAI_API_KEY = process.env.API_KEY;
console.log(OPENAI_API_KEY);

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
  console.log(req.query.userId);
  User.findById(req.query.userId)
    .then((user) => {
      console.log("User found");
      res.send(user);
    })
    .catch((err) => {
      console.log("MongoDB couldn't find user");
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
    Tree.find({ userid: req.user._id }).then((trees) => res.send(trees));
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
    customText: req.body.customText,
  });
  let userPrompt;
  console.log("req.body.learningTopic", req.body.learningTopic);
  console.log("req.body.customText", req.body.customText);

  if (req.body.learningTopic) {
    userPrompt = `Give me exactly a 10 step process to learn about ${req.body.learningTopic} with links for each step so the person can go on to learn
    about the topic then give me 1 multiple choice questions for each step in the 10 step process to verify that the person actually learnt from that link you
    provided. Also end with the answer to the question This is a sample of how i want my response. You MUST return it in this format, "Step 1: Understand the Basics of Gardening
    - Learn about the fundamental concepts of gardening, including soil, sunlight, water, and plant types.
    - Link: [Introduction to Gardening Basics](https://www.almanac.com/content/gardening-for-beginners-10-easy-steps)
    Multiple Choice Question:
    1. What are some fundamental concepts of gardening?
       A) Soil, books, air, water
       B) Soil, sunlight, water, plant types
       C) Soil, cars, planets, flowers". Answer: B`;
  } else if (req.body.customText) {
    userPrompt = `Divide the following text into 10 steps: ${req.body.customText} .Then give me 1 multiple choice questions for each step in the 10 step process to verify that the person actually learnt from that step you
    provided. Also end with the answer to the question This is a sample of how i want my response. You MUST return it in this format, "Step 1: Understand the Basics of Gardening
    Insert step 1 division content.
    Multiple Choice Question:
    1. What are some fundamental concepts of gardening?
       A) Soil, books, air, water
       B) Soil, sunlight, water, plant types
       C) Soil, cars, planets, flowers". Answer: B`;
  }

  try {
    //Call OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
          //   content: `Give me exactly a 10 step process to learn about ${req.body.learningTopic} with links for each step so the person can go on to learn
          // about the topic then give me 1 multiple choice questions for each step in the 10 step process to verify that the person actually learnt from that link you
          // provided. Also end with the answer to the question This is a sample of how i want my response. You MUST return it in this format, "Step 1: Understand the Basics of Gardening
          // - Learn about the fundamental concepts of gardening, including soil, sunlight, water, and plant types.
          // - Link: [Introduction to Gardening Basics](https://www.almanac.com/content/gardening-for-beginners-10-easy-steps)
          // Multiple Choice Question:
          // 1. What are some fundamental concepts of gardening?
          //    A) Soil, books, air, water
          //    B) Soil, sunlight, water, plant types
          //    C) Soil, cars, planets, flowers". Answer: B`,
          content: userPrompt,
          },
        ],
        max_tokens: 4000,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const gptResponse = response.data.choices[0].message.content;

    console.log("GPT Response:", gptResponse);

    const parseStepsCleaned = (gptResponse) => {
      const steps = gptResponse.split("\nStep "); // Split response by steps
      const instructionsDict = {};
      const questionsDict = {};
      const answersDict = {};

      steps.forEach((step) => {
        step = step.startsWith("Step ") ? step : "Step " + step; // Add back 'Step' for processing

        // Match the key elements
        const stepMatch = step.match(/Step (\d+): (.+?)\n/); // Match step number and title
        const instructionMatch = step.match(/Step \d+: (.+?)\nMultiple Choice Question:/s);
        const questionMatch = step.match(/Multiple Choice Question:\s*([\s\S]*?)Answer:/s);
        const answerMatch = step.match(/Answer:\s*(.+)/);

        if (stepMatch) {
          const stepNumber = parseInt(stepMatch[1], 10); // Extract step number

          // Clean the instruction text by removing "\n- " and extra newlines
          let instruction = "";
          if (instructionMatch) {
            instruction = instructionMatch[1].trim();
            instruction = instruction.replace(/\n-\s*/g, " "); // Remove "\n- " formatting
          }

          // Clean the question text by removing the number prefix (e.g., "1. ") and formatting
          let question = "";
          if (questionMatch) {
            question = questionMatch[1].trim();
            question = question.replace(/^\d+\.\s*/, ""); // Remove leading number and period
            question = question.replace(/\n\s*/g, " "); // Remove newlines and extra spaces
          }

          // Extract and clean the answer
          const answer = answerMatch ? answerMatch[1].trim() : "";

          // Assign cleaned values to dictionaries
          instructionsDict[stepNumber] = instruction;
          questionsDict[stepNumber] = question;
          answersDict[stepNumber] = answer;
        }
      });

      return { instructionsDict, questionsDict, answersDict };
    };

    const { instructionsDict, questionsDict, answersDict } = parseStepsCleaned(gptResponse);

    // Add parsed GPT response to the Tree object
    if (req.body.learningTopic) {
    newTree.gptResponseInstructions = instructionsDict;
    } else {
      newTree.gptResponseInstructions = {};
    }
    newTree.gptResponseQuestions = questionsDict;
    newTree.gptResponseAnswers = answersDict;

    // Save to MongoDB
    const savedTree = await newTree.save();
    console.log("Added Tree:", savedTree);

    console.log("Instructions Dictionary:", instructionsDict);
    console.log("Questions Dictionary:", questionsDict);

    console.log(response.data);
    console.log("RESPONSE IS", response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error calling OpenAI API:", error.response?.data || error.message);
    return res.status(500).send("Error processing OpenAI API request.");
  }

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

//GET REQUEST TO GET INSTRUCTIONS OF TREE
router.get("/treeinstructions", (req, res) => {
  Tree.findById(req.query.treeId).then((tree) => {
    res.send(tree);
  });
});

//GET REQUEST TO GET MULTIPLE CHOICE QUESTIONS OF TREE
router.get("/treequestions", (req, res) => {
  Tree.findById(req.query.treeId).then((tree) => {
    res.send(tree);
  });
});

//
//GET REQUEST TO GET ANSWERS OF TREE
router.get("/treeanswers", (req, res) => {
  Tree.findById(req.query.treeId).then((tree) => {
    res.send(tree);
  });
});
//

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

//GET request to find user by userid
router.get("/leaderboardn", (req, res) => {
  User.findById(req.query.treeId).then((user) => {
    res.send(user);
  });
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
