"use client";
import { useState, useEffect } from "react";
import { Client } from "appwrite";
import RegistrationForm from "../components/RegistrationForm";

import Background from "../components/Background";
import { Pause } from "lucide-react";


const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66d665a3001ba4f6f1b1");

const words = ["INNOVATORS", "BUILDING", "TODAY", "FOR", "THE", "WORLD", "OF", "TOMORROW"];

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showbckg, setShowBckg] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Index for current word
  const [opacity, setOpacity] = useState(1); // State for opacity
  const [fadeClass, setFadeClass] = useState("fade-in-word"); // State for fade class

  useEffect(() => {
    const timer2 = setTimeout(() => {
      setShowForm(true);
      setShowBckg(false);
    }, 5150); // 10 seconds delay

    return () => clearTimeout(timer2);
  }, []);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setFadeClass("fade-out-word");
      setTimeout(async () => {
        if (currentWordIndex <= words.length - 1) {
          setCurrentWordIndex((prevIndex) => prevIndex + 1);
        } else {
          setTimeout(() => {
            clearInterval(wordTimer); // Stop the interval after a 1-second delay
          }, 5150); // 1 second delay
        }
        setFadeClass("fade-in-word");
      }, 200); // Duration of fade-out animation
    }, 400); // Change word every 1 second

    return () => clearInterval(wordTimer);
  }, [currentWordIndex]); // Add currentWordIndex as a dependency

  return (
    <div className="container mx-auto py-10 h-screen flex items-center justify-center relative">
      {showbckg && (
        <div className="fade-out">
          <div className="background"></div>
        </div>
      )}

      <div className="relative z-10">
        {showForm && (
          <div className="fade-in">
            <RegistrationForm />
          </div>
        )}
      </div>
      <h1
        className={`title mix-blend-difference ${fadeClass}`}
        style={{ whiteSpace: "nowrap", opacity }}
      >
        <span>{words[currentWordIndex]}</span>
      </h1>
      <Background />
    </div>
  );
}
