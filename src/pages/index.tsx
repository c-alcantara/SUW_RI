import { useEffect, useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import Backgr from "../components/Backgr";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showBckg, setShowBckg] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
      setShowBckg(false);
    }, 1100);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="container mx-auto py-10 h-screen flex items-center justify-center relative">
      {showBckg && (
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
