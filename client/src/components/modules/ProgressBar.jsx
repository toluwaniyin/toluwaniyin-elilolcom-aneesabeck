// // // import React, { useState, useEffect } from "react";
// // // import "./ProgressBar.css";
// // // import { get, post } from "../../utilities";
// // // import { ToastContainer, toast } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';

// // // const ProgressBar = ({ treeId }) => {
// // //   const [progress, setProgress] = useState(0);
// // //   const [instructions, setInstructions] = useState({});
// // //   const [questions, setQuestions] = useState({});
// // //   const [answers, setAnswers] = useState({});
// // //   const [showQuestion, setShowQuestion] = useState(false);
// // //   const [currentAnswer, setCurrentAnswer] = useState("");
// // //   const [currentQuestion, setCurrentQuestion] = useState("");
// // //   const [showInstruction, setShowInstruction] = useState(true);

// // //   useEffect(() => {
// // //     if (Object.keys(instructions).length === 0) {
// // //       setShowInstruction(false);
// // //     } else {
// // //       setShowInstruction(true);
// // //     }
// // //   }, [instructions]);

// // //   // GET Progress
// // //   useEffect(() => {
// // //     get(`/api/treeprogress`, { treeId })
// // //       .then((treeResponse) => {
// // //         console.log(treeResponse); // Ensure this logs the entire tree object
// // //         const progress = treeResponse.progress || 0; // Default to 0 if progress is undefined
// // //         console.log(progress);
// // //         setProgress(progress);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error fetching tree progress:", err);
// // //       });
// // //   }, [treeId]);

// // //   const handleButtonClick = () => {
// // //     const currentStep = Math.floor(progress / 10) + 1;
// // //     setCurrentQuestion(questions[currentStep] || "No question available.");
// // //     setShowQuestion(true);
// // //   }
// // //   // const handleButtonClick = () => {
// // //   //   if (progress < 100) {
// // //   //     const updatedProgress = progress + 10;
// // //   //     setProgress(updatedProgress);

// // //   //     // POST progress
// // //   //     post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
// // //   //       (updatedTreeResponse) => {
// // //   //         console.log("Progress updated:", updatedTreeResponse);
// // //   //       }
// // //   //     );
// // //   //   }
// // //   // };

// // //   const handleButtonReset = () => {
// // //     setProgress(0);

// // //     // POST progress
// // //     post(`/api/treeprogress`, { treeId: treeId, progress: 0 }).then((resetResponse) => {
// // //       console.log("Progress reset:", resetResponse);
// // //     });
// // //   };

// // //   const handleASubmit = () => {
// // //     const currentStep = Math.floor(progress / 10) + 1;
// // //     const currentAnswer = "A";
// // //     if (currentAnswer === answers[currentStep]) {
// // //         const updatedProgress = progress + 10;
// // //         setProgress(updatedProgress);

// // //         // POST progress
// // //         post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
// // //           (updatedTreeResponse) => {
// // //             console.log("Progress updated:", updatedTreeResponse);
// // //           }
// // //         );
// // //       } else {
// // //         const updatedProgress = Math.max(progress - 10, 0); // Deduct 10% progress, but not below 0
// // //         setProgress(updatedProgress);
// // //         post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
// // //           (updatedTreeResponse) => {
// // //             console.log("Progress updated:", updatedTreeResponse);
// // //           }
// // //         );
// // //         toast.error("Incorrect answer. Try again!");
// // //       }
// // //       setShowQuestion(false);
// // //       setCurrentAnswer("");
// // //     };

// // //   const handleBSubmit = () => {
// // //     const currentStep = Math.floor(progress / 10) + 1;
// // //     const currentAnswer = "B";
// // //     if (currentAnswer === answers[currentStep]) {
// // //         const updatedProgress = progress + 10;
// // //         setProgress(updatedProgress);

// // //         // POST progress
// // //         post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
// // //           (updatedTreeResponse) => {
// // //             console.log("Progress updated:", updatedTreeResponse);
// // //           }
// // //         );
// // //       } else {
// // //         const updatedProgress = Math.max(progress - 10, 0); // Deduct 10% progress, but not below 0
// // //         setProgress(updatedProgress);

// // //         post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
// // //           (updatedTreeResponse) => {
// // //             console.log("Progress updated:", updatedTreeResponse);
// // //           }
// // //         );
// // //         toast.error("Incorrect answer. Try again!");
// // //       }
// // //       setShowQuestion(false);
// // //       setCurrentAnswer("");
// // //     };

// // //   const handleCSubmit = () => {
// // //     const currentStep = Math.floor(progress / 10) + 1;
// // //     const currentAnswer = "C";
// // //     if (currentAnswer === answers[currentStep]) {
// // //         const updatedProgress = progress + 10;
// // //         setProgress(updatedProgress);

// // //         // POST progress
// // //         post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
// // //           (updatedTreeResponse) => {
// // //             console.log("Progress updated:", updatedTreeResponse);
// // //           }
// // //         );
// // //       } else {
// // //         const updatedProgress = Math.max(progress - 10, 0); // Deduct 10% progress, but not below 0
// // //         setProgress(updatedProgress);
// // //         post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
// // //           (updatedTreeResponse) => {
// // //             console.log("Progress updated:", updatedTreeResponse);
// // //           }
// // //         );
// // //         toast.error("Incorrect answer. Try again!");
// // //       }
// // //       setShowQuestion(false);
// // //       setCurrentAnswer("");
// // //     };

// // // // const handleAnswerChange = (event) => {
// // // //   setCurrentAnswer(event.target.value);
// // // // };

// // // const getColor = () => {
// // // if (progress < 40) {
// // //   return "#ff0000"; // Red for low progress
// // // } else if (progress < 70) {
// // //   return "#ffa500"; // Orange for medium progress
// // // } else {
// // //   return "#2ecc71"; // Green for high progress
// // // }
// // // };

// // //   //GET Instructions
// // //   useEffect(() => {
// // //     get(`/api/treeinstructions`, { treeId })
// // //       .then((treeResponse) => {
// // //         console.log(treeResponse);
// // //         setInstructions(treeResponse.gptResponseInstructions || {});
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error fetching tree instructions:", err);
// // //       });
// // //   }, [treeId]);

// // //   //GET Questions
// // //   useEffect(() => {
// // //     get(`/api/treequestions`, { treeId })
// // //       .then((treeResponse) => {
// // //         console.log(treeResponse);
// // //         setQuestions(treeResponse.gptResponseQuestions || {});
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error fetching tree questions:", err);
// // //       });
// // //   }, [treeId]);

// // //   //GET Answers
// // //   useEffect(() => {
// // //     get(`/api/treeanswers`, { treeId })
// // //       .then((treeResponse) => {
// // //         console.log(treeResponse);
// // //         setAnswers(treeResponse.gptResponseAnswers || {});
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error fetching tree questions:", err);
// // //       });
// // //   }, [treeId]);

// // //   const currentStep = Math.floor(progress / 10) + 1;
// // //   const currentInstruction = instructions[currentStep] || "Start Learning!";
// // //   // const currentQuestion = questions[currentStep] || "No question available.";
// // //   // const currentAnswer = answers[currentStep];

// // //   return (
// // //     <div className="progress-container">
// // //       <div className="progress-bar">
// // //         <div
// // //           className="progress-bar-fill"
// // //           style={{
// // //             width: `${progress}%`,
// // //             backgroundColor: getColor(),
// // //           }}
// // //         ></div>
// // //       </div>
// // //       <div className="progress-label">{progress}</div>
// // //       <div
// // //         className="tree-container"
// // //         style={{
// // //           transform: `scale(${0.5 + progress / 100})`, // Scale from 0.5 to 1.5 as progress grows
// // //           transition: "transform 0.5s ease-in-out", // Smooth scaling transition
// // //         }}
// // //       >
// // //         <img
// // //           src="/grow2.png" // Replace with the path to your tree image
// // //           alt="Growing Tree"
// // //           className="tree-image"
// // //         />
// // //       </div>

// // //       {showInstruction && (<div className="instruction-container">
// // //         <h3>Step {currentStep}:</h3>
// // //         <p>{currentInstruction}</p>
// // //       </div>)}

// // //       <div className="button-container">
// // //         <button className="progress-button" onClick={handleButtonClick}>
// // //           Grow
// // //         </button>
// // //         <button className="progress-button" onClick={handleButtonReset}>
// // //           Reset
// // //         </button>
// // //       </div>
// // //       {showQuestion && (
// // //         <div className="question-container">
// // //           <p>{currentQuestion}</p>
// // //           {/* <input
// // //             type="text"
// // //             placeholder="Enter your answer here"
// // //             value={currentAnswer}
// // //             onChange={handleAnswerChange}
// // //           /> */}
// // //           <p>Choose the correct answer:</p>
// // //           <div className="button-container">
// // //             <button className="progress-button" onClick={handleASubmit}>
// // //               A
// // //             </button>
// // //             <button className="progress-button" onClick={handleBSubmit}>
// // //               B
// // //             </button>
// // //             <button className="progress-button" onClick={handleCSubmit}>
// // //               C
// // //             </button>
// // //           </div>

// // //         </div>
// // //       )}
// // //       <ToastContainer />
// // //     </div>
// // //   );
// // // };

// // // export default ProgressBar;

// // import React, { useState, useEffect } from "react";
// // import "./ProgressBar.css";
// // import { get, post } from "../../utilities";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const ProgressBar = ({ treeId }) => {
// //   const [progress, setProgress] = useState(0);
// //   const [instructions, setInstructions] = useState({});
// //   const [questions, setQuestions] = useState({});
// //   const [answers, setAnswers] = useState({});
// //   const [links, setLinks] = useState({});
// //   const [showQuestion, setShowQuestion] = useState(false);
// //   const [showInstruction, setShowInstruction] = useState(true);

// //   useEffect(() => {
// //     setShowInstruction(Object.keys(instructions).length !== 0);
// //   }, [instructions]);

// //   useEffect(() => {
// //     get(`/api/treeprogress`, { treeId })
// //       .then((treeResponse) => {
// //         setProgress(treeResponse.progress || 0);
// //       })
// //       .catch((err) => console.error("Error fetching tree progress:", err));
// //   }, [treeId]);

// //   const handleGrowClick = () => {
// //     const currentStep = Math.floor(progress / 10) + 1;
// //     setShowQuestion(true);
// //   };

// //   const handleResetClick = () => {
// //     setProgress(0);
// //     post(`/api/treeprogress`, { treeId, progress: 0 }).then(() => console.log("Progress reset"));
// //   };

// //   const handleAnswerSubmit = (selectedAnswer) => {
// //     const currentStep = Math.floor(progress / 10) + 1;
// //     if (selectedAnswer === answers[currentStep]) {
// //       const updatedProgress = progress + 10;
// //       setProgress(updatedProgress);
// //       post("/api/treeprogress", { treeId, progress: updatedProgress });
// //     } else {
// //       const updatedProgress = Math.max(progress - 10, 0);
// //       setProgress(updatedProgress);
// //       post("/api/treeprogress", { treeId, progress: updatedProgress });
// //       toast.error("Incorrect answer. Try again!");
// //     }
// //     setShowQuestion(false);
// //   };

// //   const getColor = () => {
// //     return progress < 40 ? "#ff0000" : progress < 70 ? "#ffa500" : "#2ecc71";
// //   };

// //   useEffect(() => {
// //     get(`/api/treeinstructions`, { treeId })
// //       .then((treeResponse) => setInstructions(treeResponse.gptResponseInstructions || {}))
// //       .catch((err) => console.error("Error fetching tree instructions:", err));
// //   }, [treeId]);

// //   useEffect(() => {
// //     get(`/api/treequestions`, { treeId })
// //       .then((treeResponse) => setQuestions(treeResponse.gptResponseQuestions || {}))
// //       .catch((err) => console.error("Error fetching tree questions:", err));
// //   }, [treeId]);

// //   useEffect(() => {
// //     get(`/api/treeanswers`, { treeId })
// //       .then((treeResponse) => setAnswers(treeResponse.gptResponseAnswers || {}))
// //       .catch((err) => console.error("Error fetching tree answers:", err));
// //   }, [treeId]);

// //   useEffect(() => {
// //     get(`/api/treelinks`, { treeId })
// //       .then((treeResponse) => setLinks(treeResponse.gptResponseLinks || {}))
// //       .catch((err) => console.error("Error fetching tree links:", err));
// //   }, [treeId]);

// //   const currentStep = Math.floor(progress / 10) + 1;
// //   const currentInstruction = instructions[currentStep] || "Start Learning!";
// //   const currentQuestion = questions[currentStep] || "No question available.";
// //   const currentLink = links[currentStep];

// //   return (
// //     <div className="progress-container">
// //       <div className="progress-bar">
// //         <div
// //           className="progress-bar-fill"
// //           style={{ width: `${progress}%`, backgroundColor: getColor() }}
// //         ></div>
// //       </div>
// //       <div className="progress-label">{progress}%</div>

// //       <div
// //         className="tree-container"
// //         style={{
// //           transform: `scale(${0.5 + progress / 100})`,
// //           transition: "transform 0.5s ease-in-out",
// //         }}
// //       >
// //         <img src="/grow2.png" alt="Growing Tree" className="tree-image" />
// //       </div>

// //       {showInstruction && (
// //         <div className="instruction-container">
// //           <h3>Step {currentStep}:</h3>
// //           <p>{currentInstruction}</p>
// //         </div>
// //       )}

// //       <div className="button-container">
// //         <button className="progress-button" onClick={handleGrowClick}>
// //           Grow
// //         </button>
// //         <button className="progress-button" onClick={handleResetClick}>
// //           Reset
// //         </button>
// //       </div>

// //       {showQuestion && (
// //         <div className="question-container">
// //           <p>
// //             {currentQuestion.split("\n").map((line, index) => (
// //               <span key={index}>
// //                 {line}
// //                 <br />
// //               </span>
// //             ))}
// //           </p>
// //           <p>Choose the correct answer:</p>
// //           <div className="button-container">
// //             <button className="progress-button" onClick={() => handleAnswerSubmit("A")}>
// //               A
// //             </button>
// //             <button className="progress-button" onClick={() => handleAnswerSubmit("B")}>
// //               B
// //             </button>
// //             <button className="progress-button" onClick={() => handleAnswerSubmit("C")}>
// //               C
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default ProgressBar;

// // import React, { useState, useEffect } from "react";
// // import "./ProgressBar.css";
// // import { get, post } from "../../utilities";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { Tooltip } from "react-tooltip";

// // const ProgressBar = ({ treeId }) => {
// //   const [progress, setProgress] = useState(0);
// //   const [instructions, setInstructions] = useState({});
// //   const [questions, setQuestions] = useState({});
// //   const [answers, setAnswers] = useState({});
// //   const [links, setLinks] = useState({});
// //   const [showQuestion, setShowQuestion] = useState(false);

// //   // Fetch all tree data on mount
// //   useEffect(() => {
// //     get(`/api/treeprogress`, { treeId })
// //       .then((res) => setProgress(res.progress || 0))
// //       .catch((err) => console.error("Error fetching progress:", err));

// //     get(`/api/treeinstructions`, { treeId })
// //       .then((res) => setInstructions(res.gptResponseInstructions || {}))
// //       .catch((err) => console.error("Error fetching instructions:", err));

// //     get(`/api/treequestions`, { treeId })
// //       .then((res) => setQuestions(res.gptResponseQuestions || {}))
// //       .catch((err) => console.error("Error fetching questions:", err));

// //     get(`/api/treeanswers`, { treeId })
// //       .then((res) => setAnswers(res.gptResponseAnswers || {}))
// //       .catch((err) => console.error("Error fetching answers:", err));

// //     get(`/api/treelinks`, { treeId })
// //       .then((res) => setLinks(res.gptResponseLinks || {}))
// //       .catch((err) => console.error("Error fetching links:", err));
// //   }, [treeId]);

// //   // Calculate current step based on progress
// //   const currentStep = Math.floor(progress / 10) + 1;
// //   const currentInstruction = instructions[currentStep] || "Start Learning!";
// //   const currentQuestion = questions[currentStep] || "No question available.";
// //   const currentLink = links[currentStep];

// //   // Handle answer submission
// //   const handleAnswerSubmit = (selectedAnswer) => {
// //     if (selectedAnswer === answers[currentStep]) {
// //       setProgress((prev) => prev + 10);
// //       post("/api/treeprogress", { treeId, progress: progress + 10 });
// //     } else {
// //       setProgress((prev) => Math.max(prev - 10, 0));
// //       post("/api/treeprogress", { treeId, progress: Math.max(progress - 10, 0) });
// //       toast.error("Incorrect answer. Try again!");
// //     }
// //     setShowQuestion(false);
// //   };

// //   return (
// //     <div className="progress-container">
// //       {/* Progress Bar */}
// //       <div className="progress-bar">
// //         <div
// //           className="progress-bar-fill"
// //           style={{
// //             width: `${progress}%`,
// //             backgroundColor: progress < 40 ? "#ff0000" : progress < 70 ? "#ffa500" : "#2ecc71",
// //           }}
// //         ></div>
// //       </div>
// //       <div className="progress-label">{progress}%</div>

// //       {/* Growing Tree Image */}
// //       <div
// //         className="tree-container"
// //         style={{
// //           transform: `scale(${0.5 + progress / 100})`,
// //           transition: "transform 0.5s ease-in-out",
// //         }}
// //       >
// //         <img src="/grow2.png" alt="Growing Tree" className="tree-image" />
// //       </div>

// //       {/* Step Instructions */}
// //       <div className="instruction-container">
// //         <h3>Step {currentStep}:</h3>
// //         <p>{currentInstruction}</p>
// //         {currentLink && (
// //           <p>
// //             <a
// //               href={currentLink}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="learn-more-link"
// //             >
// //               📖 Read More
// //             </a>
// //           </p>
// //         )}
// //       </div>

// //       {/* Action Buttons */}
// //       <div className="button-container">
// //         <button className="progress-button" onClick={() => setShowQuestion(true)}>
// //           Grow
// //         </button>
// //         <button
// //           className="progress-button"
// //           onClick={() => {
// //             setProgress(0);
// //             post("/api/treeprogress", { treeId, progress: 0 });
// //           }}
// //         >
// //           Reset
// //         </button>
// //       </div>

// //       {/* Question Box */}
// //       {showQuestion && (
// //         <div className="question-container">
// //           <p>
// //             {currentQuestion.split("\n").map((line, index) => (
// //               <span key={index}>
// //                 {line}
// //                 <br />
// //               </span>
// //             ))}
// //           </p>
// //           <p>Choose the correct answer:</p>
// //           <div className="button-container">
// //             <button className="progress-button" onClick={() => handleAnswerSubmit("A")}>
// //               A
// //             </button>
// //             <button className="progress-button" onClick={() => handleAnswerSubmit("B")}>
// //               B
// //             </button>
// //             <button className="progress-button" onClick={() => handleAnswerSubmit("C")}>
// //               C
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default ProgressBar;

// import React, { useState, useEffect } from "react";
// import "./ProgressBar.css";
// import { get, post } from "../../utilities";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ProgressBar = ({ treeId }) => {
//   const [progress, setProgress] = useState(0);
//   const [instructions, setInstructions] = useState({});
//   const [questions, setQuestions] = useState({});
//   const [answers, setAnswers] = useState({});
//   const [links, setLinks] = useState({});
//   const [showQuestion, setShowQuestion] = useState(false);
//   const [isValidLink, setIsValidLink] = useState(true);

//   useEffect(() => {
//     get(`/api/treeprogress`, { treeId })
//       .then((res) => setProgress(res.progress || 0))
//       .catch((err) => console.error("Error fetching progress:", err));

//     get(`/api/treeinstructions`, { treeId })
//       .then((res) => setInstructions(res.gptResponseInstructions || {}))
//       .catch((err) => console.error("Error fetching instructions:", err));

//     get(`/api/treequestions`, { treeId })
//       .then((res) => setQuestions(res.gptResponseQuestions || {}))
//       .catch((err) => console.error("Error fetching questions:", err));

//     get(`/api/treeanswers`, { treeId })
//       .then((res) => setAnswers(res.gptResponseAnswers || {}))
//       .catch((err) => console.error("Error fetching answers:", err));

//     get(`/api/treelinks`, { treeId })
//       .then((res) => setLinks(res.gptResponseLinks || {}))
//       .catch((err) => console.error("Error fetching links:", err));
//   }, [treeId]);

//   // Calculate current step
//   const currentStep = Math.floor(progress / 10) + 1;
//   const currentInstruction = instructions[currentStep] || "Start Learning!";
//   const currentQuestion = questions[currentStep] || "No question available.";
//   const currentLink = links[currentStep];

//   // Validate link (check if it leads to a real page)
//   // useEffect(() => {
//   //   if (currentLink) {
//   //     fetch(currentLink, { method: "HEAD" })
//   //       .then((res) => setIsValidLink(res.ok)) // Only set true if status is OK (200)
//   //       .catch(() => setIsValidLink(false));
//   //   } else {
//   //     setIsValidLink(true);
//   //   }
//   // }, [currentLink]);
//   // console.log(currentStep, isValidLink);

//   // Handle answer submission
//   const handleAnswerSubmit = (selectedAnswer) => {
//     if (selectedAnswer === answers[currentStep]) {
//       setProgress((prev) => prev + 10);
//       post("/api/treeprogress", { treeId, progress: progress + 10 });
//     } else {
//       setProgress((prev) => Math.max(prev - 10, 0));
//       post("/api/treeprogress", { treeId, progress: Math.max(progress - 10, 0) });
//       toast.error("Incorrect answer. Try again!");
//     }
//     setShowQuestion(false);
//   };

//   return (
//     <div className="progress-container">
//       {/* Progress Bar */}
//       <div className="progress-bar">
//         <div
//           className="progress-bar-fill"
//           style={{
//             width: `${progress}%`,
//             backgroundColor: progress < 40 ? "#ff0000" : progress < 70 ? "#ffa500" : "#2ecc71",
//           }}
//         ></div>
//       </div>
//       <div className="progress-label">{progress}%</div>

//       {/* Growing Tree Image */}
//       <div
//         className="tree-container"
//         style={{
//           transform: `scale(${0.5 + progress / 100})`,
//           transition: "transform 0.5s ease-in-out",
//         }}
//       >
//         <img src="/grow2.png" alt="Growing Tree" className="tree-image" />
//       </div>

//       {/* Step Instructions */}
//       <div className="instruction-container">
//         <h3>Step {currentStep}:</h3>
//         <p>{currentInstruction}</p>
//         {isValidLink && currentLink && (
//           <p>
//             <a
//               href={currentLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="learn-more-button"
//             >
//               🔗 Learn More
//             </a>
//           </p>
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="button-container">
//         <button className="progress-button" onClick={() => setShowQuestion(true)}>
//           Grow
//         </button>
//         <button
//           className="progress-button"
//           onClick={() => {
//             setProgress(0);
//             post("/api/treeprogress", { treeId, progress: 0 });
//           }}
//         >
//           Reset
//         </button>
//       </div>

//       {/* Question Box */}
//       {showQuestion && (
//         <div className="question-container">
//           <p>
//             {currentQuestion.split("\n").map((line, index) => (
//               <span key={index}>
//                 {line}
//                 <br />
//               </span>
//             ))}
//           </p>
//           <p>Choose the correct answer:</p>
//           <div className="button-container">
//             <button className="progress-button" onClick={() => handleAnswerSubmit("A")}>
//               A
//             </button>
//             <button className="progress-button" onClick={() => handleAnswerSubmit("B")}>
//               B
//             </button>
//             <button className="progress-button" onClick={() => handleAnswerSubmit("C")}>
//               C
//             </button>
//           </div>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default ProgressBar;

import React, { useState, useEffect, use } from "react";
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
  const [links, setLinks] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showInstruction, setShowInstruction] = useState(true);
  const [showQuestion, setShowQuestion] = useState(false);
  // const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (Object.keys(instructions).length === 0) {
      setShowQuestion(false);
    } else {
      setShowQuestion(true);
    }
  }, [instructions]);


  // Fetch all data on component mount
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
      // console.log("Progress reset:", resetResponse);
    });
  };

  const handleASubmit = () => {
    const currentStep = Math.floor(progress / 10) + 1;
    const currentAnswer = "A";
    if (currentAnswer === answers[currentStep]) {
        const updatedProgress = progress + 10;
        setProgress(updatedProgress);

        // POST progress
        post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
          (updatedTreeResponse) => {
            // console.log("Progress updated:", updatedTreeResponse);
          }
        );
      } else {
        const updatedProgress = Math.max(progress - 10, 0); // Deduct 10% progress, but not below 0
        setProgress(updatedProgress);
        post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
          (updatedTreeResponse) => {
            // console.log("Progress updated:", updatedTreeResponse);
          }
        );
        Swal.fire({
          icon: 'error',
          title: "Oops...",
          text: "Incorrect answer. Try again! Progess deducted by 10%"});
      }
      setCurrentQuestion(null);
      setShowQuestion(false);
      setCurrentAnswer("");
    };

  const handleBSubmit = () => {
    const currentStep = Math.floor(progress / 10) + 1;
    const currentAnswer = "B";
    if (currentAnswer === answers[currentStep]) {
        const updatedProgress = progress + 10;
        setProgress(updatedProgress);

        // POST progress
        post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
          (updatedTreeResponse) => {
            // console.log("Progress updated:", updatedTreeResponse);
          }
        );
      } else {
        const updatedProgress = Math.max(progress - 10, 0); // Deduct 10% progress, but not below 0
        setProgress(updatedProgress);

        post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
          (updatedTreeResponse) => {
            // console.log("Progress updated:", updatedTreeResponse);
          }
        );
        Swal.fire({
          icon: 'error',
          title: "Oops...",
          text: "Incorrect answer. Try again! Progess deducted by 10%"});
      }
      setCurrentQuestion(null);
      setShowQuestion(false);
      setCurrentAnswer("");
    };

  const handleCSubmit = () => {
    const currentStep = Math.floor(progress / 10) + 1;
    const currentAnswer = "C";
    if (currentAnswer === answers[currentStep]) {
        const updatedProgress = progress + 10;
        setProgress(updatedProgress);

        // POST progress
        post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
          (updatedTreeResponse) => {
            // console.log("Progress updated:", updatedTreeResponse);
          }
        );
      } else {
        const updatedProgress = Math.max(progress - 10, 0); // Deduct 10% progress, but not below 0
        setProgress(updatedProgress);
        post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
          (updatedTreeResponse) => {
            // console.log("Progress updated:", updatedTreeResponse);
          }
        );
        Swal.fire({
          icon: 'error',
          title: "Oops...",
          text: "Incorrect answer. Try again! Progess deducted by 10%"});
      }
      setCurrentQuestion(null);
      setShowQuestion(false);
      setCurrentAnswer("");
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
      .then((res) => setInstructions(res.gptResponseInstructions || {}))
      .catch((err) => console.error("Error fetching instructions:", err));

    get(`/api/treequestions`, { treeId })
      .then((res) => setQuestions(res.gptResponseQuestions || {}))
      .catch((err) => console.error("Error fetching questions:", err));

    get(`/api/treeanswers`, { treeId })
      .then((res) => setAnswers(res.gptResponseAnswers || {}))
      .catch((err) => console.error("Error fetching answers:", err));

    get(`/api/treelinks`, { treeId })
      .then((res) => setLinks(res.gptResponseLinks || {}))
      .catch((err) => console.error("Error fetching links:", err));
  }, [treeId]);

  // Determine current step
  const currentStep = Math.floor(progress / 10) + 1;
  const currentInstruction = instructions[currentStep] || "Start Learning!";
  // const currentQuestion = questions[currentStep] || "No question available.";
  const currentLink = links[currentStep]; // ✅ Always show link

  // // Handle answer submission
  // const handleAnswerSubmit = (selectedAnswer) => {
  //   if (selectedAnswer === answers[currentStep]) {
  //     setProgress((prev) => prev + 10);
  //     post("/api/treeprogress", { treeId, progress: progress + 10 });
  //   } else {
  //     setProgress((prev) => Math.max(prev - 10, 0));
  //     post("/api/treeprogress", { treeId, progress: Math.max(progress - 10, 0) });
  //     toast.error("Incorrect answer. Try again!");
  //   }
  //   setShowQuestion(false);
  // };

  return (
    <div className="progress-container">
      {/* Progress Bar */}
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

      {/* Growing Tree Image */}
      <div
        className="tree-container"
        style={{
          transform: `scale(${0.5 + progress / 100})`,
          transition: "transform 0.5s ease-in-out",
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

        {currentLink && (
          <p>
            <a
              href={currentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="learn-more-link"
            >
              📖 Read More
            </a>
          </p>
        )}
      </div>)}

      {/* Action Buttons */}
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
