require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

let urlDatabase = {};
app.post("/api/shorturl", function (req, res) {
  const original_url  = req.body.url;
  if(!original_url.match(/^https?:\/\//)) {
    return res.status(400).json({ error: "Invalid URL" });
  }
  const shortUrl = Math.random().toString(36).substr(2, 8);

  res.json({ original_url: original_url, "short_url": shortUrl });
});

app.get("/api/shorturl/:short_url", (req, res)=>{
  const shortUrl = req.params.short_url;
  const originalUrl = urlDatabase[shortUrl];
  if(originalUrl){
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: "Short URL not found" });
  }
})
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
