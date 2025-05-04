const users = require('./routes/users');
const dashboard = require('./routes/dashboard');
const transactions = require('./routes/transactions');

const Router = require('koa-router');

const router = new Router();

router.use('/users', users.routes());
router.use('/dashboard', dashboard.routes());
router.use('/transactions', transactions.routes());

module.exports = router;