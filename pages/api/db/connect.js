import dbConnect from "../../../db";

export default function connect(req, res) {
  dbConnect();
  res.json({ success: true });
}
