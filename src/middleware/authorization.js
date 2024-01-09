// const jwt = require("jsonwebtoken");
// const secretKey = "STMicheals";

// const loginCheck = async function (req, res, next) {
//   try {
//     // Extract the token from the Authorization header
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(403).send({
//         status: false,
//         message: `Missing authentication token in request`,
//       });
//     }

//     // Split the header to get the token part
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(403).send({
//         status: false,
//         message: `Bearer token not found`,
//       });
//     }

//     let decoded = await jwt.verify(token, secretKey);

//     if (!decoded) {
//       return res.status(403).send({
//         status: false,
//         message: `Invalid authentication token in request`,
//       });
//     }

//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(500).send({ status: false, Error: error.message });
//   }
// };

// module.exports.loginCheck = loginCheck;

const jwt = require("jsonwebtoken");

const authMidd = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  const parts = authHeader ? authHeader.split(" ") : [];

  if (parts.length === 2 && parts[0] === "Bearer") {
    const token = parts[1];

    // Here you can add your JWT token verification logic using jwt.verify
    // jwt.verify(token, secret, (err, decoded) => { ... });

    next();
  } else {
    return res.status(401).send({ status: false, msg: "Unauthorized" });
  }
};

module.exports = authMidd;
