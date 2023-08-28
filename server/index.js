    
const express = require("express");
const app = express();
const cors = require("cors");
const port = 80;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/ethereum", require("./routes/todo"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
