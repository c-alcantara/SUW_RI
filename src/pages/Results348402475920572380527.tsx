import { BrowserRouter as Router } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import { Fragment } from "react";
import { useEffect, useState } from "react";

import AltBackground from "@/components/AltBackground";
import { Client, Databases } from "appwrite"; // Updated import

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

interface Entry {
  $id: string;
  name: string;
  email: string;
  phone: string;
  eventCount: number;
  events: string[];
  displayName: string;
  id: string;
}

// Define a mapping of IDs to event names
const eventMapping: Record<string, string> = {
  a1b2c3: "Today's Networking Event",
  d4e5f6: "Tech Innovation Conference",
  "97h819": "AI in Healthcare Workshop",
  j1k213: "Digital Marketing Bootcamp",
  m4n506: "Fin Tech Innovators Meetup",
  p7q8r9: "Startup Pitch Night HealthTech Expo",
  s1t2u3: "Clean Energy Summit",
  v4w5x6: "Blockchain Disruption Conference",
  y728a1: "Mobile App Development Bootcamp",
  b2c3d4: "SaaS Growth Conference",
  e5f6q7: "Other Event", // Optional: Add a default or catch-all event
};

export default function Results348402475920572380527() {
  const [showBckg, setShowBckg] = useState<boolean>(true);
  const [data, setData] = useState<Entry[]>([]);
  const [eventSummary, setEventSummary] = useState<Record<string, number>>({});
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBckg(false);
    }, 1100);
..
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!
        );
        const uniqueEntries = new Map<string, Entry>();

        response.documents.forEach((item: any) => {
          const key = `${item.name}-${item.email}-${item.phone}`; // Unique key for each entry
          if (!uniqueEntries.has(key)) {
            // Check if event is not empty or null
            if (item.event) {
              uniqueEntries.set(key, {
                $id: item.$id,
                name: item.name, // Preserve name
                email: item.email, // Preserve email
                phone: item.phone, // Preserve phone
                eventCount: 1, // Start count at 1 for the first occurrence
                events: [item.event], // Store the event name in an array
                displayName: item.name,
                id: item.phone ? item.phone.slice(-4) : "", // Add last 4 digits of phone as ID
              });
            }
          } else {
            const entry = uniqueEntries.get(key)!;
            // Only increment if the event is valid
            if (item.event) {
              entry.eventCount += 1; // Increment event count for subsequent occurrences
              entry.events.push(item.event); // Add the event name to the array
            }
          }
        });

        const sortedData = Array.from(uniqueEntries.values()).sort(
          (a, b) => b.eventCount - a.eventCount
        ); // Sort by event count in descending order

        setData(sortedData); // Set sorted data

        // Count unique users per event
        const eventCount = new Map<string, Set<string>>();
        response.documents.forEach((item: any) => {
          const eventName = item.event;
          const userName = item.name;
          // Only count valid events
          if (eventName) {
            if (!eventCount.has(eventName)) {
              eventCount.set(eventName, new Set());
            }
            eventCount.get(eventName)!.add(userName);
          }
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

  const toggleExpand = (entryId: string) => {
    setExpandedEntry((prevEntry) => (prevEntry === entryId ? null : entryId));
  };

  return (
    <div className="container mx-auto py-10 h-screen flex flex-col items-center justify-center relative">
      {showBckg && <div className="fade-out"></div>}
      <div className="relative z-10 border-2 border-white space-y-2 max-w-lg mx-auto p-4 bg-gradient-to-t from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.6)] rounded-2xl shadow-lg backdrop-filter backdrop-blur-md p-4 max-w-md mb-6">
        <h2 className="text-2xl font-bold mb-1">SUWRI Results</h2>
        <p>Click or tap on a row to see their attended events</p>
        <table className="min-w-full bg-transparent">
          <thead>
            <tr>
              <th className="border-black px-4 py-2">Rank</th>
              <th className="border-black px-4 py-2">ID</th>
              <th className="border-black px-4 py-2">Name</th>
              <th className="border-black px-4 py-2">Events</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <Fragment key={item.$id}>
                <tr
                  onClick={() => toggleExpand(item.$id)}
                  className="border-black cursor-pointer text-md border-black px-4 py-2"
                >
                  <td className="border-black px-4 py-2">{index + 1}</td>
                  <td className="border-black px-4 py-2">{item.id}</td>
                  <td className="border-black px-4 py-2">{item.displayName}</td>
                  <td className="border-black px-2 py-2 px-4 py-2 ">
                    {eventMapping[item.id] || item.eventCount}{" "}
                    {/* Display event name or count */}
                  </td>
                </tr>
                {expandedEntry === item.$id && (
                  <tr>
                    <td colSpan={4} className="text-sm border-black px-4 py-2">
                      <ul>
                        {item.events.map((event, index) => (
                          <li key={index} className="italic">
                            {index + 1}. {event}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="relative z-10 border-2 border-white space-y-2 max-w-lg mx-auto p-3 bg-gradient-to-t from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.6)] rounded-2xl shadow-lg backdrop-filter backdrop-blur-md p-4 max-w-md">
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
              <th className="border-black  px-4 py-2">Count</th>
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
      </div>

      <AltBackground />
    </div>
  );
}
