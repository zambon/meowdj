module.exports = function (robot) {
  robot.respond(/h[ae]lp/i, function (msg) {
    msg.send("play     - Add a song to the queue");
    msg.send("skip     - Skip to the next song in the queue");
    msg.send("playlist - Show next 10 songs in the queue");
    msg.send("current  - Show song currently playing");
  });

  robot.respond(/play (.*)/i, function (msg) {
    msg.send("Adding '" + msg.match[1] + "' to the queue!");
  });

  robot.respond(/skip/i, function (msg) {
    msg.send("Boo!");
  });

  robot.respond(/playlist/i, function (msg) {
    msg.send("Up next:");
  });

  robot.respond(/current\ ?(song)?/i, function (msg) {
    msg.send("Now playing: '" + "song" + "'");
  });

  robot.hear(/google/, function (msg) {
    robot.http("https://www.google.ca").get()(function (err, res, body) {
      msg.send(body);
    });
  });
}
