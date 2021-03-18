'use strict';

require('dotenv');

const app = require('./toneanalyzer');
const port = process.env.PORT || 3000;

app.listen(port, function() {
  // eslint-disable-next-line no-console
  console.log('Server running on port: %d', port);
});