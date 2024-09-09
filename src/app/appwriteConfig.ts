import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT as string) // Your Appwrite Endpoint
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID as string); // Your project ID

const databases = new Databases(client);

export { client, databases };

// import { Client, Databases } from "appwrite";

// const client = new Client()
//   .setEndpoint("https://[YOUR_APPWRITE_ENDPOINT]") // Your Appwrite Endpoint
//   .setProject("66d665a3001ba4f6f1b1"); // Your project ID

// const databases = new Databases(client);

// export { client, databases };

// standard_70210f0d5e8ac7557a224e222784e9ad640c923d26731137069c68db64c7c8ced4de6bb1ce20b088703f3a772939ca72df4b2c122a684e238fe8f74897e206179f01fa6d90059470926bf0675c0d84ba4a5cc4202aa892f45e82b8c3482ed3855e0cde9eb2d71f64bce5833cd0f82668b855d6975ee56b84f1d72bd239fa8ed5;
