const logPath = (req, res, next) => {
  res.json({
    message: "It works",
  });
  console.log(`API Hit from ${req.path}`);
  next();
};

module.exports = logPath;
