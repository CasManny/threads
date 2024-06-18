import mongoose from 'mongoose'

let cachedConnections = (global as any).mongoose || { conn: null, promise: null }
const MONGODB_URI = process.env.MONGODB_URI

export const connectToDatabase = async () => {
    if (cachedConnections.conn) return cachedConnections.conn;
    if (!MONGODB_URI) {
        throw new Error("Admin must provide a connection string to database")
    }

    cachedConnections.promise = cachedConnections.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'threads',
        bufferCommands: false
    })

    cachedConnections.conn = await cachedConnections.promise

    return cachedConnections.conn
}