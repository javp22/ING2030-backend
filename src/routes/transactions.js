const Router = require('koa-router');
const router = new Router();
const { Transaction } = require('../models');

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
    const body = ctx.body;
    try {
        body.userId = userId;
        const newTransaction = await Transaction.create(body);

        ctx.body = { message: 'Nueva transaccion recibida', newTransaction };
        ctx.status = 201;
    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }
})

module.exports = router;