const users = require('./routes/users');
const transactions = require('./routes/transactions');
const saving_goals = require('./routes/savinggoals');
const budget = require('./routes/budget')

const Router = require('koa-router');

const router = new Router();

router.use('/users', users.routes());
router.use('/transactions', transactions.routes());
router.use('/savinggoals', saving_goals.routes());
router.use('/budgets', budget.routes());

module.exports = router;