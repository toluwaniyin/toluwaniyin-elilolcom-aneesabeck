import React, { useState, useEffect } from "react";
import "./ProgressBar.css";
import { get, post } from "../../utilities";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';


const ProgressBar = ({ treeId }) => {
  const [progress, setProgress] = useState(0);
  const [instructions, setInstructions] = useState({});
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [showInstruction, setShowInstruction] = useState(true);

  useEffect(() => {
    if (Object.keys(instructions).length === 0) {
      setShowInstruction(false);
    } else {
      setShowInstruction(true);
    }
  }, [instructions]);
  
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
    const currentStep = Math.floor(progress / 10) + 1;
    setCurrentQuestion(questions[currentStep] || "No question available.");
    setShowQuestion(true);
  }
  // const handleButtonClick = () => {
  //   if (progress < 100) {
  //     const updatedProgress = progress + 10;
  //     setProgress(updatedProgress);

  //     // POST progress
  //     post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
  //       (updatedTreeResponse) => {
  //         console.log("Progress updated:", updatedTreeResponse);
  //       }
  //     );
  //   }
  // };


  const handleButtonReset = () => {
    setProgress(0);

    // POST progress
    post(`/api/treeprogress`, { treeId: treeId, progress: 0 }).then((resetResponse) => {
      console.log("Progress reset:", resetResponse);
    });
  };

  const handleASubmit = () => {
    const currentStep = Math.floor(progress / 10) + 1;
    const currentAnswer = "A";
    if (currentAnswer === answers[currentStep]) {
      const updatedProgress = progress + 10;
      setProgress(updatedProgress);
      post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
        (updatedTreeResponse) => {
          console.log("Progress updated:", updatedTreeResponse);
        }
      );
    } else {
      const updatedProgress = Math.max(progress - 10, 0); // Deduct 10% progress, but not below 0
      setProgress(updatedProgress);
      post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
        (updatedTreeResponse) => {
          console.log("Progress updated:", updatedTreeResponse);
        }
      );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect answer. Try again! Progress deducted by 10%.',
      }); 
    }
    
    setCurrentQuestion(null); // Ensure the popup closes by setting currentQuestion to null or ""
    setShowQuestion(false); // Ensure that the popup closes
    setCurrentAnswer(""); // Reset the current answer
  };
  
  const handleBSubmit = () => {
    const currentStep = Math.floor(progress / 10) + 1;
    const currentAnswer = "B";
    if (currentAnswer === answers[currentStep]) {
      const updatedProgress = progress + 10;
      setProgress(updatedProgress);
      post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
        (updatedTreeResponse) => {
          console.log("Progress updated:", updatedTreeResponse);
        }
      );
    } else {
      const updatedProgress = Math.max(progress - 10, 0); // Deduct 10% progress, but not below 0
      setProgress(updatedProgress);
      post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
        (updatedTreeResponse) => {
          console.log("Progress updated:", updatedTreeResponse);
        }
      );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect answer. Try again! Progress deducted by 10%.',
      });  // Show the toast notification
    }
  
    setCurrentQuestion(null); // Ensure the popup closes
    setShowQuestion(false); // Ensure that the popup closes
    setCurrentAnswer(""); // Reset the current answer
  };
  
  const handleCSubmit = () => {
    const currentStep = Math.floor(progress / 10) + 1;
    const currentAnswer = "C";
    if (currentAnswer === answers[currentStep]) {
      const updatedProgress = progress + 10;
      setProgress(updatedProgress);
      post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
        (updatedTreeResponse) => {
          console.log("Progress updated:", updatedTreeResponse);
        }
      );
    } else {
      const updatedProgress = Math.max(progress - 10, 0); // Deduct 10% progress, but not below 0
      setProgress(updatedProgress);
      post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
        (updatedTreeResponse) => {
          console.log("Progress updated:", updatedTreeResponse);
        }
      );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect answer. Try again! Progress deducted by 10%.',
      }); 
    }
  
    setCurrentQuestion(null); // Ensure the popup closes
    setShowQuestion(false); // Ensure that the popup closes
    setCurrentAnswer(""); // Reset the current answer
  };
  

// const handleAnswerChange = (event) => {
//   setCurrentAnswer(event.target.value);
// };

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
  // const currentQuestion = questions[currentStep] || "No question available.";
  // const currentAnswer = answers[currentStep];

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
          src="/grow.png" // Replace with the path to your tree image
          alt="Growing Tree"
          className="tree-image"
        />
      </div>
        <div className="instruction-button-container">
      {showInstruction && (<div className="instruction-container">
        <h3>Step {currentStep}:</h3>
        <p>{currentInstruction}</p>
      </div>)}

      <div className="button-container">
        <button className="progress-button" onClick={handleButtonClick}>
          Grow
        </button>
        <button className="progress-button" onClick={handleButtonReset}>
          Reset
        </button>
      </div>
      </div>
      <Popup
        open={Boolean(currentQuestion)}
        closeOnDocumentClick
        onClose={() => setCurrentQuestion("")}
      >
        <div className="question-popup">
          <div className="question-content">
            <p>{currentQuestion}</p>
            <p>Choose the correct answer:</p>
            <div className="button-container">
              <button className="progress-button" onClick={handleASubmit}>
                A
              </button>
              <button className="progress-button" onClick={handleBSubmit}>
                B
              </button>
              <button className="progress-button" onClick={handleCSubmit}>
                C
              </button>
            </div>
          </div>
        </div>
      </Popup>
      {/* <ToastContainer style={{ zIndex: 9999 }}/> */}
    </div>
  );
};

export default ProgressBar;
