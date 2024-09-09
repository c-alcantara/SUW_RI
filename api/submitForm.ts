import { IncomingMessage, ServerResponse } from 'http';
import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID) // Use environment variables
  // .setKey(process.env.APPWRITE_API_KEY); // Use environment variables

const databases = new Databases(client);

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  console.log('Request received:', req.method);

  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const formData = JSON.parse(body);

      try {
        const response = await databases.createDocument(
          '66d77f5b00206d7de9dc', // Replace with your database ID
          '66d77fdd0033b122c7bd', // Replace with your collection ID
          'unique()', // Document ID, use 'unique()' to auto-generate
          formData
        );
        console.log('Document created:', response);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, data: response }));
      } catch (error) {
        console.error('Error creating document:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }));
      }
    });
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
  }
}