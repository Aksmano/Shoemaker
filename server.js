let express = require("express");
let app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/game.html");
});

app.listen(PORT, () => {
  console.log(`app listen on ${PORT}`);
});
