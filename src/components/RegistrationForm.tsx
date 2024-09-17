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

  function ding() {
    var sound = new Audio(
      "data:audio/mp3;base64,//tQxAAAB+w7IBTBgAm3n6wDBPAAA4TKksSxLEszMzAwPFixYsWLAMDAwN3d3EIAAAABh4eHh4AAAAABh4eHh4AAAAABh4eHjwAAAABGHv+cAAP/bWIGPsQKLyQon+JlhZf/e79dPaf/7V8KInoBbjD//8BWaQhvJUfJWlSS3//9nT7PRbTg7jRJEXsSZH///9wQyLHmY45Bck5UhBYx1f///9ntTcCjJnbErm9ijqFSuML5d/lh4VEgG//vrKslSIVVAGJlv9QQCdhimdihLv/7UsQGgAq5f1m8loABfCZqfJm1eCikINa9nyesamKCT0nIonwwLGToJJJfrRb+s3CQikk96STGSSXOmuv//WNTHRNRbJaKX//pf//SCaDyS/8v8f2/r////qJMlkgIEAnplXEUBJAH9SSpZGgtUUONbD+XkFJpoakEx+NE5pQUyenu6H6ZcJkE8ByBhxPB3mR1IzJQ+cGEW86gpluroW0FahzkZx2hrbU7VU37bqZft/+g4XY8//s+Tf//rQAwInXAAACAO5D2XUmaTZbw3IrJ//tSxAoAjEl7SafSLcFwpmj0+cl4q6K0VIuklSMD6iIOxeSc63X6DdjZygITAY1KFrJNMfQfUma9zErIrUuZGymd10VqWoLal9INQCqZ+j31Ukn9f//zIVk8//mXO//////MQCAHHYBABd3KNuXGLwj0F7MYqdad1HlLRRdRNki+yCDerUzJ7JqIeTAHjYaWyb+xm3lAt06GpN3odSzEMaDfMAaYGaZ++v7f8uKT1rqV1HTwnUYaLr6/O86///1KDAAllUAAACBAJ+tV6v/flyb/+1LECICL9TNBrFKLwXamZ/GI0XjSI/UkkVqMVsV0zhxFlC0lqlUkbq6PWg2rcqiMQF5wIgRdOIpOzSzvUJYk7sapLqRQXVscTAiGIgUgksEfLV+v2X7///1i0Fb/1Fx8sv9ISABzoAxIujq2cMt77LyN0nPKagZOxYWis4mw/ropzMi390X9alkYOcC+BgQrHkmUjQRPvUgH+HhBVqLMhrZWcLwDwIn0pA1WAiAJqX+336vb/+pMV4qf/KzZRfVk6jANcwQBEBDv53K2t2IqVf/7UsQHgAv9NTssUovBbKZnKZnReElosy4o0rqcu0s6w1S3OIOw3mQ/QNUtNnOFcfgSii/JpZk6TvOE863lYQIYKMjVFdmsi7ZmaALAxplwBdQC0w3Qe3t6vb0v/6khzx5f/y7zrgAHBAAAAAtmT91vHViHRgENIgU2ZmMkETcl0eth8j3M6ZSHPUr+lv1D7HNA5UBYcVUm1ZSdlOsNTExOMYN2VmT9EogQDCjFULfgptJdv1N6vf0f/9AWk1/+c50IgARoQAECRkSv9pd3KOfG//tSxAgAC60TN4yqi4F5ImZtltFwAA2WQE9mPY4hC8SkqwxDsVM8L53683tOGZACLgYlcIMoJJJqyw3WEQ5donD71tsk1SZgmFnhoGIC58FvJWZ2fq+vrfzn/9aAyo9jPL1gEABwABAaPTXvsX+SNkwzEBSY0YuapIrUkLqPXQFeS/I3/PvrnDxsK8Bg3YWkl5aS6lzh5S5mCQcQ8pmhQLdlqtO6mSKQNR42SNAfjAl5KyL/v53z3p//2WM4SSPRXQkADGBgAQJkU9nVzu68uXP/+1LECABKkRM3jJ6LgVEiZrGT0XAN5woYcsccdHwLHdYoBsWOyCO/pze+aEeeAGIhvZ59XW3cc0PGWVqLev2e1M1Eoj0RoQ1QLATJaref+/X7f/6xnkE+WrAIAMQEEBA+N/meGcheUhPAZUvGhUxVzA5uriAGxc1RK/53QqYuD5CFgJuJlSPrKZ5tIL8B2jtyt9pzbOhwieI8EF0CRcuJqX639Xn///1KL5aR660FABOgMAACAMQuYY75lYgUcKB0RUkNc6aKACzuriAZUdJ1Dv/"
    );
    sound.play();
  }

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
    ding(); // Trigger sound
    alert("Success!"); // Show success alert
    setIsSubmitted(true); // Update state to show the Scan QR Code button
  } else {
    if (responseData.error === "Already registered") {
      // Check for already registered error
      alert("Already registered"); // Show alert for already registered
    } else {
      setErrorMessage(responseData.error);
      if (responseData.error === "This event was already recorded.") {
        alert(responseData.error);
      }
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
            ding(); // Trigger sound
            setIsScanning(false);
            alert("Success!"); // Show success alert
          } else {
            setErrorMessage(responseData.error);
            setIsScanning(false);
            if (responseData.error === "This event was already recorded.") {
              alert(responseData.error);
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
  };

  return (
    <form
      onSubmit={handleRegisterOnly}
      className="scale-90 border-2 border-white space-y-7 max-w-md mx-auto p-6 bg-gradient-to-t from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.6)] rounded-2xl shadow-lg backdrop-filter backdrop-blur-md"
    >
      <h2 className="text-2xl font-bold mb-1">
        {"Startup Week Rhode Island "}
      </h2>
      <p className="text-sm">
        {" "}
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
          className={`w-full text-white bg-black shadow-xl transition-colors duration-300 rounded-lg h-10`}
        >
          Register
        </Button>
        {isSubmitted && (
          <Button
            type="button"
            onClick={handleScanButtonClick}
            className={`w-full text-white bg-black shadow-xl transition-colors duration-300 rounded-lg h-10`}
          >
            Scan QR Code
          </Button>
        )}
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
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
}
