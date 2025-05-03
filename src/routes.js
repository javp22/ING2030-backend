const users = require('./routes/users')
const dashboard = require('./routes/dashboard')

const Router = require('koa-router');

const router = new Router();

router.use('/users', users.routes());
router.use('/dashboard', dashboard.routes());

module.exports = router;