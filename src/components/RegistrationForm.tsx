"use client";

import { useState } from "react";
import { Label } from "../styles/ui/label";
import { Input } from "../styles/ui/input";
import { Button } from "../styles/ui/button";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Databases } from "appwrite";
import { createDocument } from "../appwrite";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    affiliation: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitted(true);
      console.log("Form submitted:", await response.json());
    } else {
      console.error("Error submitting form:", await response.json());
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
      <p className="mt-[-4px] mb-0">
        Friday September 20th - Friday September 27th
      </p>
      <div className="space-y-4">
        <div>
          <Label className="font-bold" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label className="font-bold" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label className="font-bold" htmlFor="phone">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label className="font-bold" htmlFor="affiliation">
            Affiliation
          </Label>
          <Input
            id="affiliation"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleInputChange}
          />
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
