import collection from "../../../db/models/collection";
import dbConnect from "../../../db";
export default async function (req, res) {
  await dbConnect();
  try {
    const dataArr = await collection.find().sort({ date: 1 }).limit(30);
    res.json(dataArr);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
