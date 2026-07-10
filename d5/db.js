import { MongoClient } from 'mongodb';

// Connection URI
const uri = "mongodb+srv://kimangkheang_db_user:U2INPIA5tKfNK9F9@cluster0.f2arpph.mongodb.net/?appName=Cluster0";

// Create client
export const client = new MongoClient(uri);

export async function connectToDatabase() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Connection error:", error);
    }
}