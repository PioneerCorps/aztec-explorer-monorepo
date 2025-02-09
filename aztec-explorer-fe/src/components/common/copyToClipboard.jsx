import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

export const Copy = ({ string, className = "" }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && string) {
      navigator.clipboard
        .writeText(string)
        .then(() => {
          console.log("Copied to clipboard:", string);
          setIsClicked(true);
          setTimeout(() => setIsClicked(false), 600);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <MdContentCopy
      onClick={handleCopy}
      className={`h-[14px] w-[14px] min-w-[14px] min-h-[14px] mb-[2px] cursor-pointer duration-300   ${
        isClicked
          ? "text-white bg-pastelGreen rounded-lg p-[2px] scale-[1.5] "
          : "text-white1"
      } ${className}`}
    />
  );
};
