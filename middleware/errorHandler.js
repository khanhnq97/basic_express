const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode;
  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: err.message || "Inter server error",
  });
};

export default errorHandler;
