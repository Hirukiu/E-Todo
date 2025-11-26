const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ "msg": "No token, authorization denied" });
  }

  if (err.name === 'TokenError') {
    return res.status(401).json({ "msg": "Token is not valid" });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({ "msg": "Not found" });
  }

  if (err.name === 'BadParametersError') {
    return res.status(400).json({ "msg": "Bad parameter" });
  }
  
  if (err.name === 'UserFoundError') {
    return res.status(404).json({ "msg": "User not found" });
  }

  return res.status(500).json({ "msg": "Internal server error" });
};

// Middleware pour les routes qui existent pas
function notFound(req, res, next) {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.name = "NotFoundError";
  next(error);
}

module.exports = { errorHandler, notFound };
