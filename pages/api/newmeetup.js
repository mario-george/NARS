import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    console.log(data);
    const client = await MongoClient.connect(
      'mongodb+srv://Mario:lolman22@cluster0.6c8ylwh.mongodb.net/test'
    );
    const db = client.db();
    const collection = db.collection('meetups');
    const r = await collection.insertOne(data);
    console.log(r);
    //the id of the inserted data
    client.close();
    res.status(201).json({ message: 'SUCCESS' });
  }
}
export default handler;
