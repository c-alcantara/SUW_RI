import { useState } from "react";
import { Label } from "../styles/ui/label";
import { Input } from "../styles/ui/input";
import { Button } from "../styles/ui/button";
import { CheckIcon } from "@heroicons/react/24/solid";
import { createDocument } from "../appwrite";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: 0,
    affiliation: "Participant",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, phone: parseInt(value, 10) }));
  };

  const handleAffiliationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, affiliation: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          affiliation: formData.affiliation,
        }
      );

      if (response) {
        setIsSubmitted(true);
        console.log("Form submitted:", response);
      } else {
        console.error("Error submitting form:", response);
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
            className="rounded"
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
            className="rounded"
          />
        </div>
        <div>
          <Label className="font-bold" htmlFor="phone">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handlePhoneChange}
            required
            className="rounded"
          />
        </div>
        <div>
          <Label className="font-bold" htmlFor="affiliation">
            Affiliation
          </Label>
          <select
            id="affiliation"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleAffiliationChange}
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
