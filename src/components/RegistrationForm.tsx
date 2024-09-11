import { useState, useEffect } from "react";
import { Label } from "../styles/ui/label";
import { Input } from "../styles/ui/input";
import { Button } from "../styles/ui/button";
import QrReader from "react-qr-reader";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    affiliation: "Optional", // Default
    event: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setIsSubmitted(true);
    setIsScanning(true);
  };

  const handleScan = async (data: string | null) => {
    if (data) {
      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, event: data }),
        });
        const responseData = await response.json();
        if (response.ok) {
          setIsScanning(false);
          alert("Entry submitted!");
        } else {
          setErrorMessage(responseData.error);
          setIsScanning(false);
        }
      } catch {
        setErrorMessage("An unexpected error occurred.");
        setIsScanning(false);
      }
    }
  };

  const isAvailable = new Date("2024-09-11") <= new Date(); // Check if the date is past September 28, 2024

  return (
    <form
      onSubmit={handleCapture}
      className="space-y-7 max-w-md mx-auto p-6 bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,.7)] rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-[-5px] p-0">
        Startup Week Rhode Island
      </h2>
      {!isScanning && (
        <div className="space-y-4">
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <Input
                id={field}
                name={field}
                type={field === "email" ? "email" : "text"}
                value={formData[field as keyof typeof formData]}
                onChange={handleInputChange}
                required
                className="rounded-lg shadow-md h-10 pl-2 text-base"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            </div>
          ))}
          <div>
            <Label className="font-bold mr-2" htmlFor="affiliation">
              Affiliation:
            </Label>
            <select
              id="affiliation"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleInputChange}
              className="rounded-lg shadow-md h-10 pl-2 pr-1 text-base"
            >
              {["Optional", "Participant", "Founder"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <Button
        type="submit"
        className={`w-full ${
          isScanning
            ? "bg-yellow-500"
            : errorMessage
            ? "bg-red-500"
            : "text-white bg-black shadow-xl"
        } transition-colors duration-300 rounded-lg h-10`}
      >
        {isScanning
          ? "Scanning..."
          : isSubmitted
          ? "Scan QR Code"
          : errorMessage || "Capture QR Code"}
      </Button>
      <Button
        type="button"
        className={`w-full border-2 ${
          isAvailable
            ? "border-black text-black"
            : "border-gray-400 text-gray-400 cursor-not-allowed"
        } bg-transparent rounded-lg h-10 mt-2 transition-colors duration-300`}
        onClick={() =>
          isAvailable &&
          (window.location.href = "/Results348402475920572380527")
        }
        disabled={!isAvailable}
      >
        Contest Results
      </Button>
      <p className="text-left text-sm text-gray-500 mt-0">
        (Results available September 28th)
      </p>
      {isScanning && (
        <div className="mt-0 rounded-lg overflow-hidden">
          <QrReader
            delay={300}
            onError={(err) => console.error(err)}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </form>
  );
}
