import { useState, useEffect } from "react";
import RegistrationForm from "../components/RegistrationForm";
import Backgr from "../components/Backgr";

const words = ["INNOVATORS", "BUILDING", "TODAY", "FOR", "THE", "WORLD", "OF", "TOMORROW"];

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showbckg, setShowBckg] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in-word");

  useEffect(() => {
    const timer2 = setTimeout(() => {
      setShowForm(true);
      setShowBckg(false);
    }, 4100);

    return () => clearTimeout(timer2);
  }, []);

  useEffect(() => {
    const duration = currentWordIndex === 0 ? 550 : 300; // 650 seconds for the first word, 4 seconds for others

    const changeWord = () => {
      setFadeClass("fade-out-word");
      setTimeout(() => {
        if (currentWordIndex <= words.length - 1) {
          setCurrentWordIndex((prevIndex) => prevIndex + 1);
        } else {
          // If it's the last word, do not change the index
          setFadeClass("fade-in-word"); // Just fade in the last word
          return; // Exit to prevent further changes
        }
        setFadeClass("fade-in-word");
      }, 200);
    };

    const timer = setTimeout(() => {
      changeWord();
    }, duration); // Use the calculated duration

    return () => clearTimeout(timer);
  }, [currentWordIndex]);

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
      <h1 className={`title mix-blend-difference ${fadeClass}`} style={{ whiteSpace: "nowrap" }}>
        <span>{words[currentWordIndex]}</span>
      </h1>
      <Backgr />
    </div>
  );
}
