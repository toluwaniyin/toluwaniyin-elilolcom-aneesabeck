import React, { useState, useEffect } from "react";
import "./ProgressBar.css";
import { get, post } from "../../utilities";

const ProgressBar = ({ treeId }) => {
  const [progress, setProgress] = useState(0);
  const [instructions, setInstructions] = useState({});
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});

  // GET Progress
  useEffect(() => {
    get(`/api/treeprogress`, { treeId })
      .then((treeResponse) => {
        console.log(treeResponse); // Ensure this logs the entire tree object
        const progress = treeResponse.progress || 0; // Default to 0 if progress is undefined
        console.log(progress);
        setProgress(progress);
      })
      .catch((err) => {
        console.error("Error fetching tree progress:", err);
      });
  }, [treeId]);

  const handleButtonClick = () => {
    if (progress < 100) {
      const updatedProgress = progress + 10;
      setProgress(updatedProgress);

      // POST progress
      post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
        (updatedTreeResponse) => {
          console.log("Progress updated:", updatedTreeResponse);
        }
      );
    }
  };

  const handleButtonReset = () => {
    setProgress(0);

    // POST progress
    post(`/api/treeprogress`, { treeId: treeId, progress: 0 }).then((resetResponse) => {
      console.log("Progress reset:", resetResponse);
    });
  };

  const getColor = () => {
    if (progress < 40) {
      return "#ff0000"; // Red for low progress
    } else if (progress < 70) {
      return "#ffa500"; // Orange for medium progress
    } else {
      return "#2ecc71"; // Green for high progress
    }
  };

  //GET Instructions
  useEffect(() => {
    get(`/api/treeinstructions`, { treeId })
      .then((treeResponse) => {
        console.log(treeResponse);
        setInstructions(treeResponse.gptResponseInstructions || {});
      })
      .catch((err) => {
        console.error("Error fetching tree instructions:", err);
      });
  }, [treeId]);

  //GET Questions
  useEffect(() => {
    get(`/api/treequestions`, { treeId })
      .then((treeResponse) => {
        console.log(treeResponse);
        setQuestions(treeResponse.gptResponseQuestions || {});
      })
      .catch((err) => {
        console.error("Error fetching tree questions:", err);
      });
  }, [treeId]);

  //GET Answers
  useEffect(() => {
    get(`/api/treeanswers`, { treeId })
      .then((treeResponse) => {
        console.log(treeResponse);
        setAnswers(treeResponse.gptResponseAnswers || {});
      })
      .catch((err) => {
        console.error("Error fetching tree questions:", err);
      });
  }, [treeId]);

  const currentStep = Math.floor(progress / 10) + 1;
  const currentInstruction = instructions[currentStep] || "Complete your progress to unlock more!";
  const currentQuestion = questions[currentStep] || "No question available.";
  const currentAnswer = answers[currentStep];

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: getColor(),
          }}
        ></div>
      </div>
      <div className="progress-label">{progress}</div>
      <div
        className="tree-container"
        style={{
          transform: `scale(${0.5 + progress / 100})`, // Scale from 0.5 to 1.5 as progress grows
          transition: "transform 0.5s ease-in-out", // Smooth scaling transition
        }}
      >
        <img
          src="/grow2.png" // Replace with the path to your tree image
          alt="Growing Tree"
          className="tree-image"
        />
      </div>

      <div className="instruction-container">
        <h3>Step {currentStep}:</h3>
        <p>{currentInstruction}</p>
        <p>
          <strong>Question:</strong> {currentQuestion}
        </p>
      </div>

      <div className="button-container">
        <button className="progress-button" onClick={handleButtonClick}>
          Grow
        </button>
        <button className="progress-button" onClick={handleButtonReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
