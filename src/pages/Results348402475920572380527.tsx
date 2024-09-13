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

export default function Results348402475920572380527() {
  const [showBckg, setShowBckg] = useState<boolean>(true);
  const [data, setData] = useState<Entry[]>([]);
  const [eventSummary, setEventSummary] = useState<Record<string, number>>({});
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

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
      <div className="relative z-10 bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,.7)] rounded-2xl shadow-lg p-4 max-w-md mb-6">
        <h2 className="text-2xl font-bold mb-1">SUWRI Results</h2>
        <p>Tap event count to show the events visited</p>
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
                <tr>
                  <td className="border-black px-4 py-2">{index + 1}</td>
                  <td className="border-black px-4 py-2">{item.id}</td>
                  <td className="border-black px-4 py-2">{item.displayName}</td>
                  <td
                    className="border-black px-2 py-2 cursor-pointer font-bold text-lg border-black px-4 py-2 "
                    onClick={() => toggleExpand(item.$id)}
                  >
                    {item.eventCount}
                  </td>
                </tr>
                {expandedEntry === item.$id && (
                  <tr>
                    <td colSpan={4} className="border-black px-4 py-2">
                      <ul>
                        {item.events.map((event, index) => (
                          <li key={index} className="font-bold ">
                            {event}
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
      <div className="relative z-10 bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,.7)] rounded-2xl shadow-lg p-4 max-w-md">
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
