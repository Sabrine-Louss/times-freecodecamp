// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

// serve static files
app.use(express.static('public'));

// route for the homepage
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// your timestamp API endpoint
app.get("/api/:date?", (req, res) => {
  let input = req.params.date;
  let date;
  
  if (!input) {
    date = new Date();
  } else if (/^\d+$/.test(input)) {
    // if input is all digits, treat as Unix timestamp
    date = new Date(parseInt(input));
  } else {
    // otherwise, treat as a date string
    date = new Date(input);
  }

  if (isNaN(date.getTime())) {
    return res.json({error: "Invalid Date"});
  }
  
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// listen for requests
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
