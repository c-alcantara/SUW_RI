import { VercelRequest, VercelResponse } from '@vercel/node';
import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID) // Use environment variables
  .setKey(process.env.APPWRITE_API_KEY); // Use environment variables

const databases = new Databases(client);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Request received:', req.method, req.body);

  if (req.method === 'POST') {
    const formData = req.body;

    try {
      const response = await databases.createDocument(
        '66d77f5b00206d7de9dc', // Replace with your database ID
        '66d77fdd0033b122c7bd', // Replace with your collection ID
        'unique()', // Document ID, use 'unique()' to auto-generate
        formData
      );
      console.log('Document created:', response);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error('Error creating document:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}