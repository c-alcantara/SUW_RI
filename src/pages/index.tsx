import { useState, useEffect } from "react";
import RegistrationForm from "../components/RegistrationForm";
import Background from "../components/Background";

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
    }, 5150);

    return () => clearTimeout(timer2);
  }, []);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setFadeClass("fade-out-word");
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFadeClass("fade-in-word");
      }, 200);
    }, 400);

    return () => clearInterval(wordTimer);
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
      <Background />
    </div>
  );
}
