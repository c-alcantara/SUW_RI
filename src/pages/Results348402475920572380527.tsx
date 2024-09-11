import { BrowserRouter as Router } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';

import { useEffect, useState } from "react";
import Backgr from "../components/Backgr";
import AltBackground from '@/components/AltBackground';
import { Client, Databases } from 'appwrite'; // Updated import

const client = new Client();
client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

export default function Results348402475920572380527() {
  const [showBckg, setShowBckg] = useState(true);
  const [data, setData] = useState<any[]>([]); // Use 'any' or define a specific type

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBckg(false);
    }, 1300);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!);
        const uniqueEntries = new Map();

        response.documents.forEach(item => {
          const key = `${item.name}-${item.email}-${item.phone}`;
          if (!uniqueEntries.has(key)) {
            uniqueEntries.set(key, { 
              name: item.name, // Preserve name
              email: item.email, // Preserve email
              phone: item.phone, // Preserve phone
              eventCount: 1 // Start count at 1 for the first occurrence
            });
          } else {
            uniqueEntries.get(key).eventCount += 1; // Increment event count for subsequent occurrences
          }
        });

        setData(Array.from(uniqueEntries.values())); // Convert map to array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  }, []);

  return (
    <div className="container mx-auto py-10 h-screen flex items-center justify-center relative">
      {showBckg && <div className="fade-out"></div>}
      <div className="relative z-10 bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,.7)] rounded-2xl shadow-lg p-6 max-w-md">
        <h2 className="text-2xl font-bold mb-4">SUWRI Results</h2>
        <table className="min-w-full bg-transparent ">
          <thead>
            <tr>
              <th className="border-black px-4 py-2">Name</th>
              {/* <th className="border-black px-4 py-2">Email</th>
              <th className="border-black px-4 py-2">Phone</th> */}
              <th className="border-black px-4 py-2">Events</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.$id}>
                <td className="border-black px-4 py-2">{item.name}</td>{" "}
                {/* Updated field name */}
                {/* <td className="border-black px-4 py-2">{item.email}</td>
                <td className="border-black px-4 py-2">{item.phone}</td>{" "} */}
                {/* Added phone field */}
                <td className="border-black px-4 py-2">{item.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AltBackground />
    </div>
  );
}