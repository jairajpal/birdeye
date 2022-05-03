const router = require("express").Router();
const Controller = require("../controllers");


/*****************************************************************************************************************************
******************************************************* REVIEWS **************************************************************
******************************************************************************************************************************/

router.post("/fetchReviews",                                                                   Controller.Review.fetchReviews);

module.exports = router;

