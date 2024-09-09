import { NextApiRequest, NextApiResponse } from "next";
import { Client, Databases, ID } from "appwrite";

const client = new Client();

const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "NEXT_PUBLIC_APPWRITE_PROJECT_ID environment variable is not set"
  );
}

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Make sure this is your correct Appwrite endpoint
  .setProject(projectId as string); // Type assertion to ensure it's a string

const databases = new Databases(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const formData = req.body;

    try {
      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, // Replace with your database ID
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!, // Replace with your collection ID
        ID.unique(), // Document ID, use ID.unique() to auto-generate
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
