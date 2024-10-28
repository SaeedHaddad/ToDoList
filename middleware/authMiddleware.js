// Import the jsonwebtoken library to handle JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");

// Function to verify a JSON Web Token
function verifyToken(req, res, next) {
  // Retrieve the token from the "Authorization" header in the request
  const token = req.header("Authorization");

  // If no token is found, respond with a 401 status and an error message
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    // Verify the token using a secret key. This decodes the token and
    // returns the payload if the token is valid.
    const decoded = jwt.verify(token, "your-secret-key");

    // If the token is valid, store the userId from the decoded token
    // in the request object for use in subsequent middleware/routes.
    req.userId = decoded.userId;

    // Call the next middleware function in the stack
    next();
  } catch (error) {
    // If the token is invalid or an error occurs during verification,
    // respond with a 401 status and an error message.
    res.status(401).json({ error: "Invalid token" });
  }
}

// Export the verifyToken function for use in other modules
module.exports = verifyToken;
