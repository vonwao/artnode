﻿const express = require('express');
const path = require('path');
const app = express();
const port = 3001; // Use a different port than your Next.js app

app.use(express.static('scripts'));

app.listen(port, () => {
  console.log(`Script server listening at http://localhost:${port}`);
});

