const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
    let authToken = req.cookies.Authorization;


    try {
        jwt.verify(authToken, "helloooooo");
        // If verification succeeds, call next to proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If verification fails, send a response and end the function execution
        return res.status(401).json({ message: "Unauthorized" });
    }
};
