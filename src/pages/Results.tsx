import { BrowserRouter as Router } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';

import { useEffect, useState } from "react";
import Backgr from "../components/Backgr";

export default function Results() {
  const [showBckg, setShowBckg] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBckg(false);
    }, 1300);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="container mx-auto py-10 h-screen flex items-center justify-center relative">
      {showBckg && (
        <div className="fade-out">
        
        </div>
      )}
      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-6 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Results Report</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <Backgr />
    </div>
  );
}