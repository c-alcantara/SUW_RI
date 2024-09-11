import { useEffect, useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import Backgr from "../components/Backgr";

const words = ["INNOVATORS", "BUILDING", "TODAY", "FOR", "THE", "VISION", "OF", "TOMORROW"];

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showbckg, setShowBckg] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in-word");
    const timer2 = setTimeout(() => {
      setShowForm(true);
      setShowBckg(false);
    }, 1300);
  
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

      <Backgr />
    </div>
  );
}
