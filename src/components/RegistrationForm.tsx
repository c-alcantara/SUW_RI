import { useState } from "react";
import { Label } from "../styles/ui/label";
import { Input } from "../styles/ui/input";
import { Button } from "../styles/ui/button";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: 0,
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
      className="space-y-6 max-w-md mx-auto p-6 backdrop-blur-2xl border-2 border-white bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,.7)] rounded-2xl"
    >
      <h2 className="text-2xl font-bold mb-0 p-0">Startup Week Rhode Island</h2>
      <p className="mt-[-4px] mb-0">Friday September 20th - Friday September 27th</p>
      <div className="space-y-4">
        {["name", "email", "phone"].map((field) => (
          <div key={field}>
            <Label className="font-bold" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Input
              id={field}
              name={field}
              type={field === "phone" ? "number" : "text"}
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
              required
              className="rounded"
            />
          </div>
        ))}
        <div>
          <Label className="font-bold" htmlFor="affiliation">
            Affiliation
          </Label>
          <select
            id="affiliation"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleInputChange}
            className="rounded"
          >
            <option value="Participant">Participant</option>
            <option value="Founder">Founder</option>
          </select>
        </div>
      </div>
      <Button
        type="submit"
        className={`w-full ${isSubmitted ? "bg-green-500" : "bg-black"}`}
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
