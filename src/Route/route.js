const express = require("express");
const router = express.Router();
const multer = require("multer");
// const Middleware = require("../middleware/authorization");
const storage = multer.memoryStorage(); // using memory storage for simplicity
const upload = multer({ storage: storage });
const {
  homeData,
  getData,
  getById,
  updateData,
  Deletedata,
  DeleteById,
} = require("../Controllers/homeController");

const {
  createUser,
  userLogin,
  getusersData,
} = require("../Controllers/loginController");

const {
  Contacts,
  getAllContacts,
  getContactById,
  deleteContact,
  DeleteContactdata,
  updateContact,
} = require("../Controllers/contactController");

const {
  homecontacts,
  getAllhomecontacts,
  gethomecontactById,
  deletehomecontact,
  Deletehomecontactdata,
  updatehomecontact,
} = require("../Controllers/homecontactController");

const {
  userHomeData,
  getuserHomeData,
  updateuserHomeData,
  DeleteuserHomedata,
} = require("../Controllers/userhomeController");

const {
  userContactData,
  getuserContactData,
  updateuserContactData,
  DeleteuserContactdata,
} = require("../Controllers/userContactController");
const authMidd = require("../middleware/authorization");

//**********************************user*******************************//
//login
router.post("/V1/userCreate", createUser);
router.post("/V1/userLogin", userLogin);
router.get("/V1/getuser", authMidd, getusersData);

//Home//
router.post("/V1/createhomeData", homeData);
router.get("/V1/gethomeData", getData);
router.get("/V1/getById/:homeId", authMidd, getById);
router.put("/V1/updatehomeData/:homeId", upload.single("Photo"), updateData);
router.delete("/V1/deletehomeData", Deletedata);
router.delete("/V1/deleteId/:homeId", DeleteById);

//adminHomecontact
router.post("/V1/createcontact", homecontacts);
router.get("/V1/getDatacontact", authMidd, getAllhomecontacts);
router.get("/V1/getById/:homecontactId", authMidd, gethomecontactById);
router.put(
  "/V1/updateDatacontact/:homecontactId",
  upload.single("Photo"),
  updatehomecontact
);
router.delete("/V1/deleteData", deletehomecontact);
router.delete("/V1/deleteId/:homecontactId", Deletehomecontactdata);

//AdminContact
router.post("/V1/adminContact", Contacts);
router.get("/V1/getadminContact", authMidd, getAllContacts);
router.get("/V1/getById/:contactId", authMidd, getContactById);
router.put(
  "/V1/updateadminContact/:contactId",
  upload.single("Photo"),
  updateContact
);
router.delete("/V1/DeleteContactdata", DeleteContactdata);
router.delete("/V1/deleteContact/:contactId", deleteContact);

// **************************************//
//userHome

router.post("/V1/userhomecreate", userHomeData);
router.get("/V1/getDatahome", authMidd, getuserHomeData);
router.put(
  "/V1/updateData/:homeId",
  upload.single("Photo"),
  updateuserHomeData
);
router.delete("/V1/deleteData", DeleteuserHomedata);

//userContact
router.post("/V1/user", userContactData);
router.get("/V1/getcontact", authMidd, getuserContactData);
router.put(
  "/V1/updateContact/:contactId",
  upload.single("Photo"),
  updateuserContactData
);
router.delete("/V1/deleteContact", DeleteuserContactdata);

module.exports = router;
