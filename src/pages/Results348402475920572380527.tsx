import { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import AltBackground from "@/components/AltBackground";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

export default function Results348402475920572380527() {
  const [showBckg, setShowBckg] = useState(true);
  const [data, setData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBckg(false);
    }, 1300);

    return () => clearTimeout(timer);
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
          const key = `${item.name}-${item.email}-${item.phone}`;
          if (!uniqueEntries.has(key)) {
            uniqueEntries.set(key, {
              name: item.name,
              email: item.email,
              phone: item.phone,
              eventCount: 1,
              events: [item.event],
            });
          } else {
            const entry = uniqueEntries.get(key);
            entry.eventCount += 1;
            if (!entry.events.includes(item.event)) {
              entry.events.push(item.event);
            }
          }
        });

        const sortedData = Array.from(uniqueEntries.values())
          .map((entry) => ({
            ...entry,
            displayName: entry.name,
            id: entry.phone ? entry.phone.slice(-4) : "",
          }))
          .sort((a, b) => b.eventCount - a.eventCount);

        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="container mx-auto py-10 h-screen flex flex-col items-center justify-center relative">
      {showBckg && <div className="fade-out"></div>}
      <div className="relative z-10 bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,.7)] rounded-2xl shadow-lg p-4 max-w-md mb-6">
        <h2 className="text-2xl font-bold mb-4">SUWRI Results</h2>
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
              <>
                <tr key={item.id}>
                  <td className="border-black px-4 py-2">{index + 1}</td>
                  <td className="border-black px-4 py-2">{item.id}</td>
                  <td className="border-black px-4 py-2">{item.displayName}</td>
                  <td className="border-black px-4 py-2">
                    <span
                      className="cursor-pointer text-blue-600 underline"
                      onClick={() => toggleExpandRow(index)}
                    >
                      {item.eventCount}
                    </span>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr>
                    <td colSpan="4" className="border-black px-4 py-2 text-black">
                      <ul>
                        {item.events.map((event, eventIndex) => (
                          <li key={eventIndex}>{event}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      <AltBackground />
    </div>
  );
}
