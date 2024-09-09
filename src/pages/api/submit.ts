import { NextApiRequest, NextApiResponse } from "next";
import { Client, Databases, ID } from "appwrite";

const client = new Client();

const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;

if (!projectId || !databaseId || !collectionId) {
  throw new Error(
    "One or more environment variables are not set: NEXT_PUBLIC_APPWRITE_PROJECT_ID, NEXT_PUBLIC_APPWRITE_DATABASE_ID, NEXT_PUBLIC_APPWRITE_COLLECTION_ID"
  );
}

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(projectId);

const databases = new Databases(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const formData = req.body;

    try {
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        formData
      );
      console.log("Document created:", response);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}

console.log("Project ID:", projectId);
console.log("Database ID:", databaseId);
console.log("Collection ID:", collectionId);
