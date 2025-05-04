const Router = require('koa-router');
const router = new Router();
const { Transaction, Budget } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

router.post('/', async (ctx) => {
    const { userId, period, limitAmount } = ctx.request.body

    try {
        // fecha inicio
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1);

        // gasto del periodo
        const totalSpent = await Transaction.sum('amount', {
            where: {
                userId,
                createdAt: {
                    [Op.gte]: startDate
                }
            }
        }) || 0;

        const budget = await Budget.findOne({
            where: { userId, period },
        });

        if (!budget) {
            // crear en bdd
            const budget = await Budget.create({
                userId: userId,
                period: period,
                limitAmount: limitAmount,
                spentAmount: totalSpent
            });

        } else {
            // actualizar existente
            budget.limitAmount = limitAmount;
            budget.spentAmount = totalSpent;
            await budget.save();
        }


        ctx.status = 200;
        ctx.body = budget;
    } catch (error) {
        console.error('Error al guardar presupuesto:', error);
        ctx.status = 500;
        ctx.body = 'Error interno del servidor';
    }
})

router.get("/:userId", async (ctx) => {
    const userId = ctx.params.userId;
    const { month, year } = ctx.query;

    if (!month || !year) {
        ctx.status = 400;
        ctx.body = { error: 'Se requieren parámetros "month" y "year"' };
        return;
    }
    // obtener los movimientos de usuario
    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const results = await Transaction.findAll({
            where: {
                userId,
                date: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate
                }
            },
            attributes: [
                [fn('DATE', col('date')), 'date'],
                [fn('sum', col('amount')), 'total']
            ],
            group: [fn('DATE', col('date'))],
            order: [[fn('DATE', col('date')), 'ASC']]
        });
        if (!results) {
            ctx.status = 404;
            ctx.body = { error: 'No hay movimientos en este mes' };
        } else {
            ctx.status = 200;
            ctx.body = results;
        }
        ctx.status = 200;
        ctx.body = results;
    } catch (error) {
        console.error('Error al obtener gastos mensuales:', error);
        ctx.status = 500;
        ctx.body = 'Error interno del servidor';
    }
   
})

module.exports = router;