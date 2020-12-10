const express = require("express");
const port = process.env.PORT || 8080;
const app = express();

//This will use the build that is stored in the /dist folder
app.use(express.static(__dirname + "/dist/"));

//function corrects the routing system
app.get(/.*/, (req, res) => {
  res.sendfile(__dirname + "/dist/index.html");
});

//express listens on the port that is being used by the server
app.listen(port);

console.log("The Server has started....");
