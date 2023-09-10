const mongoose = require("mongoose");

const verifyAdmin = async (req, res, next) => {
  const users = mongoose.model("User");

  const email = req.decoded.email;
  const query = { email: email };
  const user = await users.findOne(query);
  if (user?.userRole !== "admin") {
    return res.status(403).send({ error: true, message: "forbidden message" });
  }
  next();
};

module.exports = verifyAdmin;
