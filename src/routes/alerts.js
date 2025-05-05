const Router = require('koa-router');
const router = new Router();
const { Alert } = require('../models');

// Obtener todas las alertas de un usuario
router.get('/:userId', async (ctx) => {
    const userId = ctx.params.userId;

    try {

        const alert = await Alert.findAll({
            where: {
                userId: userId,
            }
        });

        ctx.body = alert;
        ctx.status = 200;

    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }

});

// Crear alerta 
router.post('/:userId', async (ctx) => {
    const userId = ctx.params.userId;
    const body = ctx.request.body;

    try {
        body.userId = userId;
        const newAlert = await Alert.create(body);

        ctx.body = { message: 'Nueva alerta creada', newAlert };
        ctx.status = 201;
    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }
});

// Borrar alerta de un usuario
router.delete('/:userId/:alertId', async (ctx) => {
    const userId = ctx.params.userId;
    const alertId = ctx.params.alertId;
    try {
        await Alert.destroy({
            where: {
                userId: userId,
                id: alertId
            }
        });

        ctx.body = { message: 'La alerta ha sido eliminada' };
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }
});

// Borrar todas las alertas de un usuario
router.delete('/:userId', async (ctx) => {
    const userId = ctx.params.userId;
    try {
        await Alert.destroy({
            where: {
                userId: userId,
            }
        });

        ctx.body = { message: 'Todas las alertas del usuario han sido eliminadas' };
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }
});


module.exports = router;