// This script starts the server. It's responsible for connecting the app to
// the real world, i.e. setup a database connection, bind to a port and wait
// indefinitely.
//
// Note, that this file should be kept as simple as possible, as it is not
// covered by unit tests.

const app = require('./app');

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server has started on port ${process.env.PORT || 5000}`);
});