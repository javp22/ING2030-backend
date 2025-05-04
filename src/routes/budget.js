const Router = require('koa-router');
const router = new Router();
const { Transaction, Budget } = require('../models');
const { Op } = require('sequelize');

router.post('/',  async (ctx) => {
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

module.exports = router;