import { Client, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("66d665a3001ba4f6f1b1"); // Replace with your Appwrite project ID

export const databases = new Databases(client);

export const createDocument = async (
  databaseId: string,
  collectionId: string,
  data: Record<string, any>
) => {
  try {
    return await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      data,
      ['read("any")'] // Adjust the permissions as needed
    );
  } catch (error) {
    throw error;
  }
};
