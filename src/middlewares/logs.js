const logPath = (req, res, next) => {
  console.log(`API Hit from ${req.path}`);
  next();
};

module.exports = logPath;
