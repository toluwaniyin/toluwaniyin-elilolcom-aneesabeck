import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import treeGif from "loadingtree.gif";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-bar-wrapper">
        <motion.div
          className="loading-bar"
          style={{
            width: `${progress}%`, // This grows relative to the wrapper (100px)
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <h1>SkillGrow</h1>
      <img src={treeGif} alt="Tree Growing" />
    </div>
  );
};

export default LoadingScreen;
