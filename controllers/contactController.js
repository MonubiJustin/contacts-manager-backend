const constants = require("../constants");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
};

//@desc Get single contact
//@route GET /api/contacts/:id
//@access private
const getContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: "Contact not found" });
  res.status(200).json(contact);
};

//@desc Create new contact
//@route POST /api/contacts
//@access private
const newContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!email || !phone) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All fields are mandatory");
  }
  const contact = new Contact({
    name,
    email,
    phone,
    user_id: req.user.id
  });

  await contact.save();
  res.status(201).json(contact);
};

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = async (req, res) => {
  let contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: "Contact not found" });

  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("User can't have permission to update other user contact")
  }

  contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res
    .status(200)
    .json({ message: `Update contact for ${req.params.id}`, contact: contact });
};

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: "Contact not found" });

  if (contact.user_id.toString() !== req.user.id) {
    return res.status(403).json({ message: "Permission denied" });
  }

  await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: `Deleted contact ${req.params.id}`, contact });
};


module.exports = {
  getContacts,
  getContact,
  newContact,
  updateContact,
  deleteContact,
};
