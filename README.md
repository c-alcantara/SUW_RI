By Christian Alcantara 
Dev Accelerator
11 September 2024
for Startup Week RI


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:
 npm i
 npm run build
 npm start

For functionality, this need hosted on a backend/server such as Vercel.com with the enviormental variables (.env) and not locally:

NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID= Your project ID
NEXT_PRIVATE_APPWRITE_API_KEY= Your API key
NEXT_PUBLIC_APPWRITE_DATABASE_ID= Your database
NEXT_PUBLIC_APPWRITE_COLLECTION_ID= Your collection

This uses AppWrite with the the follow Atrtributes in the collection: 
![attributes](<Screenshot 2024-09-11 005554.png>)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
