// middleware/errorHandler.js

// This catches any errors in the app and sends a response
const errorHandler = (err, req, res, next) => {
  // show error in the console for debugging
  console.error('Error:', err.message);

  // use the status code already set, or default to 500 if nothing
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // send a simple JSON response to the client
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Oops! Something went wrong. Try again.',
  });
};

module.exports = errorHandler;