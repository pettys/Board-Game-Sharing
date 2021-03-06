require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

const userRouter = require('./routes/user.router');
const searchRouter = require('./routes/search.router');
const otherUserRouter = require('./routes/other.users.router');
const gameManagementRouter = require('./routes/game.management.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/search/users', otherUserRouter);
app.use('/api/game/management', gameManagementRouter);

// Serve static files.
app.use(express.static('build'));

// App Set.
const PORT = process.env.PORT || 5000;

// Display that the app is running.
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
