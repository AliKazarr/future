import React, { useState, useEffect } from "react";

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20); // Yazı hızı
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

export default TypewriterText;
