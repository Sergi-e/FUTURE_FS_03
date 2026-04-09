export const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message);
  const status = err.statusCode || 500;
  const message = err.message || 'Server Error';
  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found — ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
