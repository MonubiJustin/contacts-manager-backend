const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  newContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const auth = require('../middlewere/auth')

router.use(auth)
router.get("/", getContacts).post("/", newContact);
router
  .get("/:id", getContact)
  .put("/:id", updateContact)
  .delete("/:id", deleteContact);

module.exports = router;
