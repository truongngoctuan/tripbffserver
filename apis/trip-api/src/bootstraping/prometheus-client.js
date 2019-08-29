const { createPlugin, getSummary, getContentType } = require('@promster/hapi');

function addMonitoringService(server) {
  let plugin = createPlugin();
  let options = {};
  let done;
  
  plugin.register(server, options, done);

  server.route({
    method: "GET",
    path: "/metrics",
    handler: function(req, h) {
      // req.statusCode = 200;
      return h.response(getSummary())
      .header('Content-Type', getContentType());
    },
    options: {
      tags: ["api"]
    }
  });
  console.log("prometheus client registered");
}

module.exports.addMonitoringService = addMonitoringService;
