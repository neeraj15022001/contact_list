const express = require("express");
const router = express.Router();
const controllers = require("../../../controllers/api/v1/index")
const contactController = controllers.contactController;
router.post("/new", contactController.new);
router.delete("/delete", contactController.delete);
module.exports = router;