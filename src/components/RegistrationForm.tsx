import { useState } from "react";
import { Label } from "../styles/ui/label";
import { Input } from "../styles/ui/input";
import { Button } from "../styles/ui/button";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    affiliation: "Participant",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validate phone number to allow only digits
    if (name === "phone" && !/^\d*$/.test(value)) {
      return; // Ignore non-digit input
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value, // Keep value as string for phone
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message on new submission

    // Improved email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address."); // Set error message for invalid email
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/-/g, ""), // Remove dashes before submission
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        console.log("Form submitted:", data);
      } else {
        setErrorMessage(data.error); // Set error message
        console.error("Error submitting form:", data.error);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred."); // Set generic error message
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
              type={field === "email" ? "email" : "text"} // Set type to "email" for email input
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
            <option value="Participant">Participant</option>
            <option value="Founder">Founder</option>
          </select>
        </div>
      </div>
      <Button
        type="submit"
        className={`w-full ${
          isSubmitted ? "bg-yellow-500" : errorMessage ? "bg-red-500" : "text-white bg-black"
        } transition-colors duration-300 rounded-lg h-12`} // Change color based on submission status
      >
        {isSubmitted ? (
          "Capture QR Code" // Change text on successful submission
        ) : errorMessage ? (
          errorMessage // Show error message if submission fails
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
