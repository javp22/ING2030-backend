const Router = require('koa-router');
const router = new Router();
const { Transaction, Budget } = require('../models');
const { Op } = require('sequelize');

// gasto del dia
router.get('/daily/:userId', async (ctx) => {
    const userId = ctx.params.userId;

    // limites del dia
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // sumar transacciones del usuario de ese dia
    try {
        const transactions = await Transaction.findAll({
            where: {
              userId,
              type: 'cargo',
            },
          });
        let total = 0;
        transactions.forEach(t => {
            total += t.amount
          });
        console.log("Total gasto diario:", total);

        if (total === null) {
            ctx.body = {
                message: "No se han realizado transacciones hoy",
                total: 0,
            };
            ctx.status = 200;
        } else {
            ctx.body = {
                total: -total || 0,
                startOfDay: start.toISOString()
            };
            ctx.status = 200;
        }
    } catch (error) {
        if (total == 0) {
            ctx.body = "Error en el servidor"
        }
        ctx.status = 500;

    }
});

// progreso 
router.get('/budget/:userId', async (ctx) => {
    const userId = ctx.params.userId;

    try {
        console.log(userId)
        // encontrar presupuesto
        const budget = await Budget.findOne({
          where: { userId },
          order: [['createdAt', 'DESC']]
        });
    
        if (!budget) {
          ctx.status = 404;
          ctx.body = { message: 'No se ha creado presupuesto' };
          return;
        }
        ctx.status = 200;
        ctx.body = budget;
        console.log(budget)
      } catch (error) {
        console.error('Error al obtener el presupuesto:', error);
        ctx.status = 500;
        ctx.body = { message: 'Error interno del servidor' };
      }

});

module.exports = router;
