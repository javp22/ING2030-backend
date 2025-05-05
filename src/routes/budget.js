const Router = require('koa-router');
const router = new Router();
const { Transaction, Budget, User } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

// crear presupuesto
router.post('/', async (ctx) => {
    const { userId, category, period, limitAmount } = ctx.request.body;

    try {
        // verificar si existe presupuesto
        const existing = await Budget.findOne({ where: { userId, category } });
        if (existing) {
            ctx.status = 400;
            ctx.body = { message: 'Presupuesto ya existe para esta categoria' };
            return;
        }
        const user = await User.findOne({
            where: { id: userId },
        });

        if (user.budget + Number(limitAmount) > user.balance) {
            ctx.status = 403;
            ctx.body = { message: 'Presupuesto supera sueldo disponible' };
            return;
        } else {
            user.budget += limitAmount;
            await user.save();
        }

        // establecer periodo 
        const now = new Date();
        let startDate;

        if (period === 'mensual') {
            // primer día del mes actual
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        } else if (period === 'semanal') {
            // lunes de esta semana
            const dayOfWeek = now.getDay(); // 0 (domingo) - 6 (sábado)
            const mondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
            startDate = new Date(now);
            startDate.setDate(now.getDate() + mondayOffset);
            startDate.setHours(0, 0, 0, 0);
        }

        // se añaden transferencias existentes tipo cargo
        const totalSpent = await Transaction.sum('amount', {
            where: {
                userId,
                type: "cargo",
                category: category,
                date: {
                    [Op.gte]: startDate
                }
            }
        }) || 0;

        const limitAmountNum = Number(limitAmount);

        const budget = await Budget.create({
            userId,
            period,
            category,
            limitAmount: limitAmountNum,
            spentAmount: -totalSpent,
        });


        ctx.status = 201;
        ctx.body = budget;
    } catch (error) {
        console.error('Error al crear presupuesto:', error);
        ctx.status = 500;
        ctx.body = { message: 'Error interno del servidor', error: error.message };
    }
});

// obtener presupuestos de un usuario
router.get('/:userId', async (ctx) => {
    const userId = ctx.params.userId;
    console.log('userId:', userId, 'typeof:', typeof userId);

    try {
        console.log(userId)
        // encontrar presupuestos
        const budgets = await Budget.findAll({
            where: { userId },
        });

        if (!budgets) {
            ctx.status = 404;
            ctx.body = { message: 'No se han creado presupuestos' };
            return;
        }
        ctx.status = 200;
        ctx.body = budgets;
        console.log(budgets)
    } catch (error) {
        console.error('Error al obtener el presupuesto:', error);
        ctx.status = 500;
        ctx.body = { message: 'Error interno del servidor', error: error.message };
    }

});

// obtener presupuesto en base a la categoria
router.get('/:userId/:category', async (ctx) => {
    const { userId, category } = ctx.params;

    try {
        // encontrar presupuesto por categoría
        const budget = await Budget.findOne({
            where: { userId, category },
        });

        if (!budget) {
            ctx.status = 404;
            ctx.body = { message: 'No se encontró un presupuesto para esta categoría' };
            return;
        }

        ctx.status = 200;
        ctx.body = budget;
    } catch (error) {
        console.error('Error al obtener el presupuesto por categoría:', error);
        ctx.status = 500;
        ctx.body = { message: 'Error interno del servidor', error: error.message };
    }
});
module.exports = router;