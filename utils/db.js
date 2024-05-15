const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST ? process.env.DB_HOST : "localhost";
    const port = process.env.DB_PORT ? process.env.DB_PORT : "27017";
    const database = process.env.DB_DATABASE ? process.env.DB_DATABASE : "files_manager";

    const uri = `mongodb://${host}:${port}/${database}`;
    //https://stackoverflow.com/questions/61277898/useunifiedtopology-true-pass-deprecated
    this.client = new MongoClient(uri, { useUnifiedTopology: true } );
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  // https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
