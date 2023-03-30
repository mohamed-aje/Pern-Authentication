const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const PORT = 3001;
//ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
