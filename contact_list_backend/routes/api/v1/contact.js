const express = require("express");
const router = express.Router();
const controllers = require("../../../controllers/api/v1/index")
const contactController = controllers.contactController;
router.post("/create", contactController.create);
router.get("/read", contactController.read);
router.put("/update", contactController.update);
router.delete("/delete", contactController.delete);
module.exports = router;