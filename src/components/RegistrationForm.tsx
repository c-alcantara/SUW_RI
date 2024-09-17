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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // State for scanning
  const [buttonText, setButtonText] = useState("Connect"); // State for button text
  const [buttonColor, setButtonColor] = useState("bg-black"); // State for button color

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



  const handleRegisterOnly = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, event: "Registration" }),
    });

    const responseData = await response.json();

    if (response.ok) {

      setButtonColor("bg-green-500"); // Change button color to green
      setButtonText("Success"); // Change button text to "Success"
      setIsSubmitted(true); // Update state to show the Scan QR Code button

      // Change back to "Scan QR Code" after 1 second
      setTimeout(() => {
        setButtonText("Scan QR Code");
        setButtonColor("bg-black"); // Reset button color
        setShowScanner(true);
      }, 1000);
    } else {
      if (
        responseData.error ===
        `Hello ${formData.name}, you can now scan a QR code`
      ) {
        setErrorMessage(responseData.error); // Show alert for already registered
 setButtonColor("bg-green-500"); // Change button color to green
 setButtonText("Success"); // Change button text to "Success"
 setIsSubmitted(true); // Update state to show the Scan QR Code button

 // Change back to "Scan QR Code" after 1 second
 setTimeout(() => {
   setButtonText("Scan QR Code");
   setButtonColor("bg-black"); // Reset button color
   setShowScanner(true);
 }, 1000);
      } else {
        setErrorMessage(responseData.error);
      }
    }
  };

  const isAvailable = new Date("2024-09-14") <= new Date();

  const handleScan = async (data: string | null) => {
    if (data) {
      if (!isSubmitting) {
        setIsSubmitting(true);
        try {
          const submitData = { ...formData, event: data };
          const response = await fetch("/api/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submitData),
          });

          const responseData = await response.json();

          if (response.ok) {
      setShowScanner(false);
            setIsScanning(false);
            alert("Success!"); // Show success alert
          } else {
            setErrorMessage(responseData.error);
            setIsScanning(false);
            if (responseData.error === "This event was already recorded.") {
              alert(responseData.error);
             setShowScanner(false);
              setErrorMessage("");
              //  window.location.reload();
            }
          }
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const handleScanButtonClick = () => {
    setShowScanner((prev) => !prev); // Toggle scanner visibility
    setIsScanning(true); // Set scanning to true when scanner is shown
  };

  return (
    <form
      onSubmit={handleRegisterOnly}
      className="scale-90 border-2 border-white space-y-7 max-w-md mx-auto p-6 bg-gradient-to-t from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.6)] rounded-2xl shadow-lg backdrop-filter backdrop-blur-md"
    >
      <h2 className="text-2xl font-bold mb-2">Startup Week RI Registration</h2>
      <p>
        We’re bringing together entrepreneurs, local leaders, students,
        corporations, investors and friends together to connect, collaborate and
        grow through entrepreneurial events. Across the state, Rhode Island’s
        Innovation Community has come together to showcase their events during
        this week.
      </p>
      <div className="space-y-4">
        {["name", "email", "phone"].map((field) => (
          <div key={field}>
            <Input
              id={field}
              name={field}
              type={
                field === "phone" ? "tel" : field === "email" ? "email" : "text"
              }
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
              required
              className="rounded-xl h-10 pl-3 text-md border-0"
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
            className="rounded-3xl shadow-md h-10 pl-3 text-base"
          >
            {["Affiliation", "Participant", "Founder"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className="text-xs text-black opacity-50 pt-1">(Optional)</p>
        </div>
      </div>
      <div className="flex justify-between space-x-3">
        <Button
          type="button"
          onClick={handleRegisterOnly}
          className={`w-full text-white ${buttonColor} shadow-xl transition-colors duration-300 rounded-lg h-10`}
        >
          {buttonText}
        </Button>
      </div>
      {isSubmitted && showScanner && (
        <div className="mt-0 rounded-lg overflow-hidden">
          <QrReader
            delay={300}
            onError={(err) => console.error(err)}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </div>
      )}
      <div>
        <p className="text-left text-sm text-black  "></p>
        <Button
          type="button"
          className={`w-full border-2 ${
            isAvailable
              ? "border-black text-black"
              : "border-black text-black  cursor-not-allowed"
          } bg-transparent rounded-xl h-10 mt-0 transition-colors duration-300`}
          onClick={() =>
            isAvailable &&
            (window.location.href = "/Results348402475920572380527")
          }
          disabled={!isAvailable}
        >
          Contest Results
        </Button>
        <p className="text-left text-sm text-black  ">
          Results available September 28th
        </p>
      </div>
      {errorMessage && <p className="text-yellow-500">{errorMessage}</p>}
    </form>
  );
}
