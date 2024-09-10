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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('./pages/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        console.log("Form submitted:", data);
      } else {
        console.error("Error submitting form:", data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 backdrop-blur-2xl border-2 border-white bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,.55)] rounded-2xl"
    >
      <h2 className="text-2xl font-bold mb-[-5px] p-0">Startup Week Rhode Island</h2>
      <p className=" mb-0">September 20th - September 27th</p>
      <div className="space-y-4"> {/* Ensure this div wraps all fields for consistent spacing */}
        {["name", "email", "phone"].map((field) => (
          <div key={field}>
            <Input
              id={field}
              name={field}
              type={field === "phone" ? "number" : "text"}
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
              required
              className="rounded-lg shadow-md h-10 pl-2"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)} // Set placeholder to field title
            />
          </div>
        ))}
        <div> {/* Moved affiliation into the same spacing structure */}
          <Label className="font-bold mr-2" htmlFor="affiliation">Affiliation:  </Label>
          <select
            id="affiliation"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleInputChange}
            className="rounded-lg shadow-md h-10 pl-2 pr-1" // Added padding-left for consistency
          >
            <option value="Participant">Participant</option>
            <option value="Founder">Founder</option>
          </select>
        </div>
      </div>
      <Button
        type="submit"
        className={`w-full ${isSubmitted ? "bg-green-500" : "text-white bg-black"} transition-colors duration-300`} // Added transition for smooth color change
      >
        {isSubmitted ? (
          <span className="flex items-center justify-center">
            <CheckIcon className="h-5 w-5 mr-2" />
            Submitted
          </span>
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
