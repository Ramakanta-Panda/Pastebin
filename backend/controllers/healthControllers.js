import mongoose from "mongoose";

export const healthCheck = async (req, res) => {
  const dbState = mongoose.connection.readyState === 1;
  res.status(200).json({ ok: dbState });
};
