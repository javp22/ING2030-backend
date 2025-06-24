const Router = require('koa-router');
const router = new Router();
const { Transaction, Budget, User } = require('../models');
const { Op } = require('sequelize');

// Obtener todas las transacciones de todos los usuarios
router.get('/', async (ctx) => {
    try {
        const transac = await Transaction.findAll();
        ctx.body = transac;
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }
});


// Obtener transacciones de un usuario
router.get('/history/:userId', async (ctx) => {
    const userId = ctx.params.userId;
    try {
        const transac = await Transaction.findAll({
            where: {
                userId: userId,
            }
        });

        ctx.body = transac;
        ctx.status = 200;

    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }

});

// Crear nueva transaccion
router.post('/:userId', async (ctx) => {
    const userId = ctx.params.userId;
    const body = ctx.request.body;
    const entry = body.entry; 
    try {
        entry.userId = userId;
        entry.date = new Date();
        entry.amount = parseInt(entry.amount);
        const newTransaction = await Transaction.create(entry);
        console.log(newTransaction);

        // buscar presupuesto 
        const budget = await Budget.findOne({
            where: {
                userId: userId,
                category: newTransaction.category,
            }
        });

        if (budget) {
            if (newTransaction.type === "cargo") {
                // Aumentar la cantidad de gasto
                budget.spentAmount += Math.abs(newTransaction.amount);
                await budget.save();
            }

        }
        const user = await User.findOne({
            where: {
                id: userId,
            }
        });

        // Actualizar atributos del usuario

        if (newTransaction.type === "cargo") {
            // Para gastos, se actualiza el atributo "spent" del usuario.
            user.spent += Math.abs(newTransaction.amount);
            user.balance -= Math.abs(newTransaction.amount)
        }

        else if (newTransaction.type === "deposito") {
            // Para depósitos, se actualiza el atributo "balance" del usuario.
            user.balance += newTransaction.amount;
        }
        await user.save();

        ctx.body = { message: 'Nueva transaccion recibida', newTransaction };
        ctx.status = 201;
    } catch (error) {
        console.log(error);
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }
})


// gastos del dia de un usuario
router.get('/daily/:userId', async (ctx) => {
    const userId = ctx.params.userId;

    // limites del dia
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // sumar gastos del usuario de ese dia
    try {
        const transactions = await Transaction.findAll({
            where: {
                userId,
                type: 'cargo',
                date: {
                    [Op.between]: [start, end]
                }
            },
        });
        let total = 0;
        transactions.forEach(t => {
            total += t.amount
        });
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


// obtener gastos de un usuario en un mes
router.get("monthly/:userId", async (ctx) => {
    const userId = ctx.params.userId;
    const { month, year } = ctx.query;

    if (!month || !year) {
        ctx.status = 400;
        ctx.body = { error: 'Se requieren parámetros "month" y "year"' };
        return;
    }
    // obtener los movimientos de usuario
    try {
        // limites del mes
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const results = await Transaction.findAll({
            where: {
                userId,
                type: "cargo",
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

// actualizar categoría de una transacción
router.put('/:id', async (ctx) => {
    const id = ctx.params.id;
    const { category } = ctx.request.body;

    try {
        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            ctx.status = 404;
            ctx.body = { error: 'Transacción no encontrada' };
            return;
        }

        transaction.category = category;
        await transaction.save();

        ctx.status = 200;
        ctx.body = { message: 'Categoría actualizada', transaction };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message || 'Error en el servidor' };
    }
});


module.exports = router;