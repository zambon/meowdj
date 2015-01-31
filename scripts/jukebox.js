var endpoint = "http://slack-jukebox.mybluemix.net";

module.exports = function (robot) {
  var get = function (path, prefix) {
    prefix = prefix || "";
    robot.http(endpoint + "/" + path).get()(function (err, res, body) {
      if (res.statusCode == 200) {
        msg.send(prefix + body);
      }
    });
  };

  robot.respond(/h[ae]lp/i, function (msg) {
    msg.send("play     - Add a song to the queue");
    // msg.send("skip     - Skip to the next song in the queue");
    msg.send("playlist - Show next 10 songs in the queue");
    msg.send("current  - Show song currently playing");
  });

  robot.respond(/play (.*)/i, function (msg) {
    data = JSON.stringify({
      song: msg.match[1]
    });

    msg.send(data);

    robot.http(endpoint + "/add")
      .header("Content-Type", "application/json")
      .post(data)(function (err, res, body) {
        if (res.statusCode == 200) {
          msg.send("Adding '" + body + "' to the queue!");
        } else {
          msg.send("Nope.");
        }
      });
  });

  // robot.respond(/skip/i, function (msg) {
  //   msg.send("Boo!");
  // });

  robot.respond(/playlist/i, function (msg) {
    get("playlist");
  });

  robot.respond(/current\ ?(song)?/i, function (msg) {
    get("current", "Now playing: ");
  });

  robot.hear(/google/, function (msg) {
    robot.http("https://www.google.ca").get()(function (err, res, body) {
      msg.send(body);
    });
  });
}
