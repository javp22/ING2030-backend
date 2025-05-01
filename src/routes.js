const users = require('./routes/users')

const Router = require('koa-router');

const router = new Router();

router.use('/users', users.routes())

module.exports = router;