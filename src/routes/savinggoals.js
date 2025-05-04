const Router = require('koa-router');
const router = new Router();
const { SavingGoal } = require('../models');

// Obtener todas las metas de todos los usuarios
router.get('/', async (ctx) => {
    try {
        const goals = await SavingGoal.findAll();
        ctx.body = goals;
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }
});

// Obtener meta actual de un usuario
router.get('/:userId', async (ctx) => {
    const userId = ctx.params.userId;

    try {

        const goal = await SavingGoal.findAll({
            where: {
                userId: userId,
            }
        });

        ctx.body = goal;
        ctx.status = 200;

    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }

});

// Crear meta solo si no existe una actual
router.post('/:userId', async (ctx) => {
    const userId = ctx.params.userId;
    const body = ctx.request.body;

    try {
        const existingGoal = await SavingGoal.findOne({
            where: {
                userId: userId,
            }
        });

        if (existingGoal) {
            ctx.body = { error: 'Ya existe una meta para este usuario' };
            ctx.status = 400;
            return;
        }

        body.userId = userId;
        const newGoal = await SavingGoal.create(body);

        ctx.body = { message: 'Nueva meta creada', newGoal };
        ctx.status = 201;
    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }
});

// Modificar meta 
router.patch('/:userId', async (ctx) => {
    const userId = ctx.params.userId;
    const updates = ctx.request.body;

    try {
        const goal = await SavingGoal.findOne({
            where: {
                userId: userId,
            }
        });

        if (!goal) {
            ctx.body = { error: 'Meta no encontrada' };
            ctx.status = 404;
            return;
        }

        await goal.update(updates);

        ctx.body = { message: 'Meta actualizada', goal };
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }
});

module.exports = router;