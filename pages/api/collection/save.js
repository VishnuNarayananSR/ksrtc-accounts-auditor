import collection from "../../../db/models/collection";
export default async function saveCollection(req, res) {
  try {
    const data = await collection.create(JSON.parse(req.body));
    res.json({ success: true, data });
  } catch (err) { 
    console.log(err.message)
    res.status(400).json({ success: false, err: err, data: req.body });
  }
}
