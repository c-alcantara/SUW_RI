import { useState, useEffect } from "react";
import { Input } from "../styles/ui/input";
import { Button } from "../styles/ui/button";
import QrReader from "react-qr-reader";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    affiliation: "Optional",
    event: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setIsSubmitted(true);
    setIsScanning(true);
    setShowScanner(true);
  };

  const handleRegisterOnly = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    await handleScan(null);
    setIsSubmitting(false);
  };

  const handleScan = async (data: string | null) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        const submitData = data ? { ...formData, event: data } : formData;
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        });

        const responseData = await response.json();

        if (response.ok) {
          setIsScanning(false);
          setShowScanner(false);
          alert("Success!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            affiliation: "Optional",
            event: "",
          });
        } else {
          setErrorMessage(responseData.error);
          setIsScanning(false);
          setShowScanner(false);
          if (responseData.error === "This event was already recorded.") {
            alert(responseData.error);
          }
        }
      } catch {
        setErrorMessage("An unexpected error occurred.");
        setIsScanning(false);
        setShowScanner(false);
      }
      setIsSubmitting(false);
    }
  };

  const isAvailable = new Date("2024-09-28") <= new Date();

  return (
    <form
      onSubmit={handleCapture}
      className="scale-90 space-y-7 max-w-md mx-auto p-6 bg-gradient-to-t from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.6)] rounded-2xl shadow-lg backdrop-filter backdrop-blur-md"
    >
      <h2 className="text-2xl font-bold mb-2">
        Startup Week RI Registration
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
                className="rounded-lg h-10 pl-3 text-md border-0"
                placeholder={`${
                  field.charAt(0).toUpperCase() + field.slice(1)
                } (Required)`}
              />
              
            </div>
          ))}
          <div>
            <select
              id="affiliation"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleInputChange}
              className="rounded-lg shadow-md h-10 pl-2 pr-1 text-base"
            >
              {["Affiliation?", "Participant", "Founder"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <p className="text-xs text-black opacity-50 pt-1">Optional</p>
          </div>
        </div>
      )}
      <Button
        type="button"
        onClick={handleRegisterOnly}
        className="w-full text-white bg-black font-bold shadow-xl transition-colors duration-300 rounded-lg h-10"
      >
        Register
      </Button>
      {isMobile && (
        <Button
          type="submit"
          className={`w-full ${
            isScanning
              ? "bg-yellow-500"
              : errorMessage
              ? "bg-red-500"
              : "text-white font-bold bg-black shadow-xl"
          } transition-colors duration-300 rounded-lg h-10`}
        >
          {isScanning
            ? "Scanning..."
            : isSubmitted
            ? "Scan QR Code"
            : errorMessage || "Capture QR Code"}
        </Button>
      )}
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
        Results available September 28th
      </p>
      {showScanner && (
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
