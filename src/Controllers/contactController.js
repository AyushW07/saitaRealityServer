const contactModel = require("../Models/contactModel");

const Contacts = async (req, res) => {
  try {
    const { _id, id, Email, Published } = req.body;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    let query = {};
    if (_id) {
      query._id = _id;
    }
    const update = {
      id,
      Email,
      Published,
    };

    const updatedData = await contactModel.findOneAndUpdate(
      query,
      update,
      options
    );

    return res.status(200).send({
      status: true,
      msg: "Data created or updated successfully",
      data: updatedData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Server error", error: err.message });
  }
};
const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await contactModel.findById(contactId);
    if (!contact) {
      return res.status(404).send({
        status: false,
        msg: "Contact not found",
      });
    }
    res.status(200).send({
      status: true,
      msg: "Contact retrieved successfully",
      data: contact,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let contactId = req.params.contactId;

    const existingUnit = await contactModel.findOne({
      Published,
      id: { $ne: contactId },
    });
    let updateBody = await contactModel.findOneAndUpdate(
      { id: contactId },
      {
        $set: {
          Published: Published,
        },
      },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      messege: "Data updated successfully",
      data: updateBody,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const deletedContact = await contactModel.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).send({
        status: false,
        msg: "Contact not found",
      });
    }

    res.status(200).send({
      status: true,
      msg: "Contact deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const DeleteContactdata = async (req, res) => {
  try {
    const result = await contactModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} contact`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
module.exports = {
  Contacts,
  getAllContacts,
  getContactById,
  deleteContact,
  DeleteContactdata,
  updateContact,
};
