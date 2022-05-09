import dbConnect from "../../../db";
import Collection from "../../../db/models/collection";

export default async function getDieselPrice(req, res) {
  // await dbConnect();
  try {
    const dieselPriceArr = await Collection.find().sort({ date: -1 }).limit(1);
    const dieselPrice = dieselPriceArr.length ? dieselPriceArr[0].dieselPrice : 0;
    res.json({ dieselPrice });
  } catch (err) {
    res.status(400).send("Unable to fetch diesel price");
  }
}
