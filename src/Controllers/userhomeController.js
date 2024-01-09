const homeContactModel = require("../Models/homeContactModel");
const userHomeModel = require("../Models/userhomeModel");
const nodemailer = require("nodemailer");
const userHomeData = async (req, res) => {
  try {
    const { _id, Name, LastName, Email, Phone, Property, Message } = req.body;
    console.log(req.body);
    const admissions = await homeContactModel.findOne({ isDeleted: false });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nikitalilhore123@gmail.com",
        pass: "dzjfxzvmwndjwmme",
      },
    });
    const mailOptions = {
      from: "nikitalilhore123@gmail.com",
      to: `${admissions?.Email}`,
      subject: "Submission for saitaReality.com",
      text: `
        Name: ${Name}
        Phone: ${Phone}
        LastName: ${LastName}
        Email :${Email}
        Message: ${Message}
        Property: ${Property}
          
        `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          status: false,
          msg: "Email not sent!",
        });
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).send({
          status: true,
          msg: "Data created and email sent successfully",
          data: contact,
        });
      }
    });
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    let query = {};
    if (_id) {
      query._id = _id;
    }

    const update = {
      Name,
      LastName,
      Email,
      Phone,
      Message,
      Property,
    };
    const updatedData = await userHomeModel.findOneAndUpdate(
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

const getuserHomeData = async (req, res) => {
  try {
    const userHomeData = await userHomeModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "userHomeData retrieved succesfully",
      data: userHomeData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const updateuserHomeData = async (req, res) => {
  try {
    const { Name, LastName, Email, Phone, Message, Property } = req.body;
    const userHomeId = req.params.userHomeId;

    const UpdateuserHome = await userHomeModel.findByIdAndUpdate(
      userHomeId,
      { $set: { Name, LastName, Email, Phone, Message, Property } },
      { new: true }
    );

    // console.log("Update result:", UpdateuserHome);

    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: UpdateuserHome,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteuserHomedata = async (req, res) => {
  try {
    const result = await userHomeModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} userHomedata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

module.exports = {
  userHomeData,
  getuserHomeData,
  updateuserHomeData,
  DeleteuserHomedata,
};
