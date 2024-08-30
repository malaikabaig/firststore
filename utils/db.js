import mongoose from 'mongoose';

const connection = {};
async function connect() {
  if (connection.isConnected) {
    console.log('A connection is already established');
  }
  if (mongoose.connection.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connect.isConnected === 1) {
      console.log('Use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log('Nw Connection to Database');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('Not Disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;
