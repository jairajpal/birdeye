const router = require("express").Router();
const Review = require("./Review");

router.use("/tiger", Review);

module.exports = router;