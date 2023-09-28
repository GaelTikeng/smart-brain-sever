const VerifyAuthToken = require("../utility/tokenUtility");

const AuthMiddleWare = async (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization) {
    const token = authorization.split(" ").pop();
    
    if (token) {
      try {
        const user = VerifyAuthToken(token);
        console.log(user);
        req.user = user; // set user on request stream

        next();
      } catch (err) {
        console.log("token is invalid", err);
        return res.send({ message: "token is invalid" });
      }
    } else {
      return res.send("Unable to login user");
    }
  } else {
    return res.send({ message: "login credentials not valid" });
  }
};
module.exports = AuthMiddleWare;
