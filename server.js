require('@babel/register');
/* eslint-disable no-console */
require('dotenv');
const app = require('./app');

const port = process.env.APP_PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  })
})