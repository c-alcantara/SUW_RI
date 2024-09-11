import { useState } from "react";
import { Label } from "../styles/ui/label";
import { Input } from "../styles/ui/input";
import { Button } from "../styles/ui/button";
import { CheckIcon } from "@heroicons/react/24/solid";
 import QrReader from "react-qr-reader";
import { Inter } from 'next/font/google'; // Example for Google Fonts

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    affiliation: "Participant",
    event: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false); // State to control QR scanning

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Format phone number by removing non-digit characters
    if (name === "phone") {
      const formattedPhone = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        phone: formattedPhone,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        console.log("Form submitted:", data);
        setIsScanning(true); // Start scanning after successful submission
      } else {
        setErrorMessage(data.error);
        console.error("Error submitting form:", data.error);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
      console.error("Error submitting form:", error);
    }
  };

  const handleScan = (data: string | null) => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        event: data, // Set the scanned QR code data to the event field
      }));
      setIsScanning(false); // Stop scanning after capturing the QR code
      alert("Entry submitted!"); // Show alert after capturing
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <form
      onSubmit={handleCapture}
      className="space-y-6 max-w-md mx-auto p-6 backdrop-blur-2xl border-2 border-white bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,.55)] rounded-2xl"
    >
      <h2 className="text-2xl font-bold mb-[-5px] p-0">
        Startup Week Rhode Island
      </h2>
      <p className="mb-0">September 20th - September 27th</p>
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
              className="rounded-lg shadow-md h-10 pl-2"
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
            className="rounded-lg shadow-md h-10 pl-2 pr-1"
          >
            <option value="Optional">Optional</option> {/* New default option */}
            <option value="Participant">Participant</option>
            <option value="Founder">Founder</option>
          </select>
        </div>
      </div>
      <Button
        type="submit"
        className={`w-full ${
          isScanning
            ? "bg-yellow-500"
            : errorMessage
            ? "bg-red-500"
            : "text-white bg-black"
        } transition-colors duration-300 rounded-lg h-12`}
      >
        {isScanning
          ? "Scanning..."
          : isSubmitted
          ? "Scan QR Code"
          : errorMessage
          ? errorMessage
          : "Capture QR Code"}
      </Button>
      {isScanning && (
        <div className="mt-4 rounded-lg overflow-hidden">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </form>
  );
}
