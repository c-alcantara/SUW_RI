import { Client, Databases } from "appwrite";

console.log('Endpoint:', process.env.REACT_APP_APPWRITE_ENDPOINT);
console.log('Project ID:', process.env.REACT_APP_APPWRITE_PROJECT_ID);
console.log('API Key:', process.env.REACT_APP_APPWRITE_API_KEY);

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT as string) // Your Appwrite Endpoint
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID as string) // Your project ID
  // .setKey(process.env.REACT_APP_APPWRITE_API_KEY as string); // Your API key

const databases = new Databases(client);

export { client, databases };

