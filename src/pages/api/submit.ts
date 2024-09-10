import { NextApiRequest, NextApiResponse } from "next";
import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`Received ${req.method} request`); // Log the request method
  if (req.method === "POST") {
    try {
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
        error: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
