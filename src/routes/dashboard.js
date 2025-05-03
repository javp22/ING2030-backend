const Router = require('koa-router');
const router = new Router();
const { Transaction, Budget } = require('../models');

// gasto del dia
router.get('/daily/:userId', async (ctx) => {
    const userId = ctx.params.userId;

    // limites del dia
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // sumar transacciones del usuario de ese dia
    const total = await Transaction.sum('amount', {
        where: {
            userId,
            date: { [Op.between]: [start, end] }
        }
    });

    ctx.body = {
        total: total || 0,
        startOfDay: start.toISOString()
    };
});

// progreso presupuesto
router.get('/goals/:userId', async (ctx) => {
    const userId = ctx.params.userId;

    // ultimo presupuesto semanal
    const weekly = await Budget.findOne({
        where: {
            userId,
            period: 'weekly'
        },
        order: [['createdAt', 'DESC']]
    });
    // ultimo presupuesto mensual
    const monthly = await Budget.findOne({
        where: {
            userId,
            period: 'monthly'
        },
        order: [['createdAt', 'DESC']]
    });

    ctx.body = {
        weekly: weekly ? {
            ...weekly.toJSON(),
            progress: weekly.limitAmount
                ? (weekly.spentAmount / weekly.limitAmount) * 100
                : 0
        } : null,
        monthly: monthly ? {
            ...monthly.toJSON(),
            progress: monthly.limitAmount
                ? (monthly.spentAmount / monthly.limitAmount) * 100
                : 0
        } : null
    };

});

module.exports = router;
