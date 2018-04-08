module.exports = function (RED) {
  "use strict";

  var Message = require("../lib/msg");
  var path = require('path');

  function NoreliteColorOutNode(config) {
    RED.nodes.createNode(this, config);
    this.color = config.color;
    var self = this;

    /* When a message is received */
    self.on("input", function (msg) {

      var nmsg = new Message(self, msg);

      nmsg.setColor(self.color);
      self.send(nmsg.toMessageObject());
    });
  }
  RED.nodes.registerType("nrl-color in", NoreliteColorOutNode);

  RED.httpAdmin.get('/norelite/color/*', function (req, res) {
    var options = {
      root: __dirname + '/static/',
      dotfiles: 'deny'
    };

    res.sendFile(req.params[0], options);
  });
}
