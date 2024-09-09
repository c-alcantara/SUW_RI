'use client'

import { useState } from "react";
import { Label } from "../styles/ui/label";
import { Checkbox } from "../styles/ui/checkbox";
import {  Input } from "../styles/ui/input";
import { Textarea } from "../styles/ui/textarea";
import { Button } from "../styles/ui/button";
import { Card } from "../styles/ui/card";
import { CheckIcon } from '@heroicons/react/24/solid'; // Updated import path
import { databases } from "../appwriteConfig";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    networkLearn: false,
    networkShowcase: false,
    firstName: '',
    lastName: '',
    email: '',
    hearAboutUs: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await databases.createDocument(
        "66d77f5b00206d7de9dc", // databaseId
        "66d77fdd0033b122c7bd", // collectionId
        "unique()", // documentId, use 'unique()' for auto-generated ID
        formData, // data
        ['read("any")'] // permissions (optional)
      );

      if (result) {
        setIsSubmitted(true);
        console.log('Form submitted:', result);
      } else {
        console.error('Error submitting form:', result);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md mx-auto p-6 backdrop-blur-2xl border-2 border-white bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,.7)] rounded-2xl"
      >
        <h2 className="text-2xl font-bold mb-0 p-0">Startup Week Rhode Island</h2>
        <p className="mt-[-4px] mb-0">Friday September 20th - Friday September 27th</p>
        <div className="space-y-4">
          <Label className="text-base">I want to:</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="networkLearn"
              checked={formData.networkLearn}
              onCheckedChange={handleCheckboxChange("networkLearn")}
            />
            <Label htmlFor="networkLearn">
              Network and learn more about new startups in RI
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="networkShowcase"
              checked={formData.networkShowcase}
              onCheckedChange={handleCheckboxChange("networkShowcase")}
            />
            <Label htmlFor="networkShowcase">
              Network and showcase my startup
            </Label>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="font-bold" htmlFor="firstName">
              Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
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
        </div>
        <Button type="submit" className={`w-full ${isSubmitted ? 'bg-green-500' : 'bg-black'}`}>
          {isSubmitted ? (
            <span className="flex items-center justify-center">
              <CheckIcon className="h-5 w-5 mr-2" />
              Submitted
            </span>
          ) : (
            'Register'
          )}
        </Button>
      </form>
    </>
  );
}