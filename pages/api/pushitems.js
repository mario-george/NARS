import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(
      'mongodb+srv://Mario:lolman22@cluster0.6c8ylwh.mongodb.net/numbers'
    );
    const db = client.db();
    const collection = db.collection('numbers');
const r=await collection.insertOne(data)
console.log(r)
res.status(201).json({message:'SUCCESS'})
client.close()
  }
}
export default handler;
