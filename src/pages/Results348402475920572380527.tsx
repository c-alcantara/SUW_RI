import React, { Fragment, useEffect, useState } from "react";
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

const Results348402475920572380527: React.FC = () => {
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
            if (item.event) {
              uniqueEntries.set(key, {
                $id: item.$id,
                name: item.name,
                email: item.email,
                phone: item.phone,
                eventCount: 1,
                events: [item.event],
                displayName: item.name,
                id: item.phone ? item.phone.slice(-4) : "",
              });
            }
          } else {
            const entry = uniqueEntries.get(key)!;
            if (item.event) {
              entry.eventCount += 1;
              entry.events.push(item.event);
            }
          }
        });

     
        const sortedData = Array.from(uniqueEntries.values()).sort(
          (a, b) => b.eventCount - a.eventCount
        );

        setData(sortedData);


        const eventCount = new Map<string, Set<string>>();
        response.documents.forEach((item: any) => {
          const eventName = item.event;
          const userName = item.name;
          if (eventName) {
            if (!eventCount.has(eventName)) {
              eventCount.set(eventName, new Set());
            }
            eventCount.get(eventName)!.add(userName);
          }
        });

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

    fetchData();
  }, []);

  const toggleExpand = (entryId: string) => {
    setExpandedEntry((prevEntry) => (prevEntry === entryId ? null : entryId));
  };

  return (
    <div className="container mx-auto py-10 h-screen flex flex-col items-center justify-center relative">
      {showBckg && <div className="fade-out"></div>}
      <div className="relative z-10 border-2 border-white space-y-2 max-w-lg mx-auto p-4 bg-gradient-to-t from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.6)] rounded-2xl shadow-lg backdrop-filter backdrop-blur-md p-4 max-w-md mb-6">
        <h2 className="text-2xl font-bold mb-1">Registrations</h2>
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
                  <td className="border-black px-4 py-2 flex items-center">
                    <span
                      className={`ml-2 transform transition-transform ${
                        expandedEntry === item.$id ? "rotate-90" : ""
                      }`}
                      style={{
                        display: "inline-block",
                        width: "0",
                        height: "0",
                        marginLeft: "1px",
                        marginRight: "10px",
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderLeft: "5px solid black",
                      }}
                    ></span>

                    <span>{index + 1}</span>
                  </td>
                  <td className="border-black px-4 py-2">{item.id}</td>
                  <td className="border-black px-4 py-2">{item.displayName}</td>
                  <td className="font-bold border-black px-2 py-2 px-4 py-2 ">
                    {item.eventCount}
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
              <th className="border-black px-4 py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(eventSummary)
              .sort(([, countA], [, countB]) => countB - countA) // Sort by count in descending order
              .map(([event, count]) => (
                <tr key={event}>
                  <td className="border-black px-4 py-2">
                    {event === "Startup Week RI" ? "Total Registrations" : event}
                  </td>
                  <td className="border-black px-4 py-2">{count}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <AltBackground />
    </div>
  );
};

export default Results348402475920572380527;
