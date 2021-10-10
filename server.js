const fs = require('fs');
const path = require('path');
const express = require('express');
const { db } =require('./db/db');
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes/index.js');
const htmlRoutes = require('./routes/htmlRoutes/index');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const liveReloadServer = livereload.createServer();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

liveReloadServer.watch(path.join(__dirname, 'public'))
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/notes");
    }, 100);
  });

  
app.listen(PORT, () => {
    console.log(`API Server now on port ${PORT}`);
})