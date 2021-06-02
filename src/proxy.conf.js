

const PROXY_CONFIG = {
  "/studentAPI/*": {
      "target": "http://erp.greenpasturecollege.ac.ug",
      "secure": false,
      "bypass": function (req, res, proxyOptions) {
          if (req.headers.accept.indexOf("html") !== -1) {
              console.log("Skipping proxy for browser request.");
              return "/index.html";
          }
          req.headers["X-Custom-Header"] = "yes";
      }
  }
}

module.exports = PROXY_CONFIG;