import React, { useState, useEffect } from "react";
import "./ProgressBar.css";
import { get, post } from "../../utilities";

const ProgressBar = ({ treeId }) => {
  const [progress, setProgress] = useState(0);

  // GET Progress
  useEffect(() => {
    get("/api/treeprogress").then((TreeResponse) => {
      let new_progress = TreeResponse.progress; // Default to 0 if progress is undefined
      setProgress(new_progress);
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
      <button className="progress-button" onClick={handleButtonClick}>
        Grow
      </button>
      <button className="progress-button" onClick={handleButtonReset}>
        Reset
      </button>
    </div>
  );
};

export default ProgressBar;
