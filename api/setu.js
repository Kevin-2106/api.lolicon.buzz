const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const response = await fetch('https://api.ln.app/setu/v2');
  const json = await response.json();
  const originalUrl = json.data.urls.original;

  res.redirect(307, originalUrl);
};
