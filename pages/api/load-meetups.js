async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = MongoClient.connect(
      'mongodb+srv://Mario:lolman22@cluster0.6c8ylwh.mongodb.net/test'
    );
    const db = client.db();
    const collection = db.collection('meetups');
    const docs = collection.find().toArray();
    //array of docs
    console.log(docs);
    res.status(201).json({
      message: 'SUCCESS',
      docs: docs.map((e) => {
        return {
          id: e._id.toString(),
          name: e.name,
          address: e.address,
          image: e.image,
        };
      }),
    });
  }
}
export default handler;
