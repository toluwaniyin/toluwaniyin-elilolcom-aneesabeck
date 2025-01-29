import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ username }) => {
  const fullText = `Welcome to ${username}'s Forest...`;
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true); // Track typing status

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100); // Adjust typing speed here

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false); // Stop showing cursor when done typing
    }
  }, [index, fullText]);

  return (
    <header className="dashboard-header">
      <h1 className={isTyping ? "typing" : "done"}>{typedText}</h1>
      <p>Select your tree or create a new tree to get started</p>
    </header>
  );
};

export default Header;
