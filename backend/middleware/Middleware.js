// middleware/Middleware.js

const middleware = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Pass control to the next middleware or route handler
};

module.exports = middleware; // Ensure this is exporting the function correctly
