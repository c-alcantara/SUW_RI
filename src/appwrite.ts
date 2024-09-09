import { Client, Databases, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

export const createDocument = async (databaseId: string, collectionId: string, data: any) => {
  return await databases.createDocument(databaseId, collectionId, ID.unique(), data);
};
