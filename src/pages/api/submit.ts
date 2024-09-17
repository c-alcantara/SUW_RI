// Import necessary modules
import { NextApiRequest, NextApiResponse } from "next";
import { Client, Databases, ID, Query } from "appwrite";

// Define a mapping of IDs to event names
const eventMapping: Record<string, string> = {
  a1b2c3: "Today's Networking Event",
  d4e5f6: "Tech Innovation Conference",
  g7h8i9: "AI in Healthcare Workshop",
  j1k2l3: "Digital Marketing Bootcamp",
  m4n5o6: "Fin Tech Innovators Meetup",
  p7q8r9: "Startup Pitch Night",
  s1t2u3: "HealthTech Expo",
  v4w5x6: "Clean Energy Summit",
  y7z8a1: "Blockchain Disruption Conference",
  b2c3d4: "Mobile App Development Bootcamp",
  e5f6g7: "SaaS Growth Conference",
};

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(client);

// Function to check for duplicate entries
async function checkDuplicate(data: any) {
  const { name, email, phone, event } = data;
  const response = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
    [
      Query.equal("name", name),
      Query.equal("email", email),
      Query.equal("phone", phone),
      Query.equal("event", event)
    ]
  );

  return response.total > 0;
}

// API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Map scanned key to event name
      const scannedKey = req.body.event;
      const eventName = eventMapping[scannedKey] || scannedKey;

      // Update the request body with the mapped event name
      req.body.event = eventName;

      // Check for duplicates
      const isDuplicate = await checkDuplicate(req.body);
      if (isDuplicate && req.body.event != "Registration") {
        res
          .status(400)
          .json({ success: false, error: "This event was already recorded." });
        return;
      }
   if (isDuplicate && req.body.event == "Registration") {
  const foundEntryName = req.body.name; // Assuming the name is in the request body
  res.status(400).json({
    success: false,
    error: `Hello ${foundEntryName}, Click OK to scan a QR code`,
  });
  return;
   }
      // Create a new document in the database
      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
        ID.unique(),
        req.body
      );

      res.status(200).json({ success: true, data: response });
    } catch (error) {
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
