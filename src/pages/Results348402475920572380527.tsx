import { BrowserRouter as Router } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";

import { useEffect, useState } from "react";

import AltBackground from "@/components/AltBackground";
import { Client, Databases } from "appwrite"; // Updated import

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

export default function Results348402475920572380527() {
  const [showBckg, setShowBckg] = useState(true);
  const [data, setData] = useState<any[]>([]); // Use 'any' or define a specific type
  const [eventSummary, setEventSummary] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBckg(false);
    }, 1100);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!
        );
        const uniqueEntries = new Map();

        response.documents.forEach((item) => {
          const key = `${item.name}-${item.email}-${item.phone}`; // Unique key for each entry
          if (!uniqueEntries.has(key)) {
            uniqueEntries.set(key, {
              name: item.name, // Preserve name
              email: item.email, // Preserve email
              phone: item.phone, // Preserve phone
              eventCount: 1, // Start count at 1 for the first occurrence
            });
          } else {
            uniqueEntries.get(key).eventCount += 1; // Increment event count for subsequent occurrences
          }
        });

        const sortedData = Array.from(uniqueEntries.values())
          .map((entry) => ({
            ...entry,
            event: entry.eventCount, // Set event to the count of unique events
            displayName: entry.name,
            id: entry.phone ? entry.phone.slice(-4) : "", // Add last 4 digits of phone as ID
          }))
          .sort((a, b) => b.event - a.event); // Sort by event count in descending order

        setData(sortedData); // Set sorted data

        // Count unique users per event
        const eventCount = new Map<string, Set<string>>();
        response.documents.forEach((item) => {
          const eventName = item.event;
          const userName = item.name;
          if (!eventCount.has(eventName)) {
            eventCount.set(eventName, new Set());
          }
          eventCount.get(eventName)!.add(userName);
        });

        // Prepare summary data
        const summary = Object.fromEntries(
          Array.from(eventCount.entries()).map(([event, users]) => [
            event,
            users.size,
          ])
        );
        setEventSummary(summary);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function to resolve the error
  }, []);

  return (
    <div className="container mx-auto py-10 h-screen flex flex-col items-center justify-center relative">
      {showBckg && <div className="fade-out"></div>}
      <div className="relative z-10 bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,.7)] rounded-2xl shadow-lg p-4 max-w-md mb-6">
        <h2 className="text-2xl font-bold mb-4">SUWRI Results</h2>
        <table className="min-w-full bg-transparent">
          <thead>
            <tr>
              <th className="border-black px-4 py-2">Rank</th>{" "}
              <th className="border-black px-4 py-2">ID</th>
              {/* New Rank column */}
              <th className="border-black px-4 py-2">Name</th>
              <th className="border-black px-4 py-2">Events</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (
                item,
                index // Use index for rank
              ) => (
                <tr key={item.$id}>
                  <td className="border-black px-4 py-2">{index + 1}</td>{" "}
                  <td className="border-black px-4 py-2">{item.id}</td>
                  {/* Display rank */}
                  <td className="border-black px-4 py-2">{item.displayName}</td>
                  <td className="border-black px-4 py-2">{item.event}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {/* <div className="relative z-10 bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,.7)] rounded-2xl shadow-lg p-4 max-w-md ">
        <table className="min-w-full bg-transparent">
          <thead>
            <tr>
              <th
                className="border-black px-4 py-2 text-2xl font-bold"
                colSpan={2}
              >
                Top Events
              </th>
            </tr>
            <tr>
              <th className="border-black px-4 py-2">Event</th>
              <th className="border-black px-4 py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(eventSummary).map(([event, count]) => (
              <tr key={event}>
                <td className="border-black px-4 py-2">{event}</td>
                <td className="border-black px-4 py-2">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <AltBackground />
    </div>
  );
}
