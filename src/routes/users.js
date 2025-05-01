const Router = require('koa-router');
const router = new Router();
const { User } = require('../models');

// Creacion de Usuario:
router.post('/register', async (ctx) => {
    const body = ctx.request.body;
    const email = body.email;
    console.log(email);
    try {
        const existingUser = await User.findOne({ where: { email: email } });

        if (existingUser) {
            // usuario ya existe
            ctx.body = { error: 'El email ya esta en uso' };
            ctx.status = 409;
            return;
        }

        const newUser = await User.create(body);
        ctx.body = { message: 'Usuario creado correctamente', newUser };
        ctx.status = 201;

    } catch (error) {
        ctx.body = { error: error.message || "Error en el servidor" };
        ctx.status = 500;
    }
});

// Inicio de sesion de Usuario:
router.post('/login', async (ctx) => {
    const body = ctx.request.body;
    const email = body.email;
    const password = body.password;
    console.log(email);
    console.log(password);
    try {
        // Buscar al usuario por email
        const user = await User.findOne({ where: { email: email } });
        console.log(user);

        if (!user) {
            // Usuario no encontrado. No existe
            ctx.body = { error: 'Usuario no encontrado' };
            ctx.status = 404;
            return;
        }

        // // Se asume que la contraseña es plaintext para no complicarnos tanto
        // // TODO: agregar mas adelante encriptacion para hacer esto mas seguro
        if (password !== user.password) {
            // Incorrecta
            ctx.body = { error: 'Contraseña incorrecta' };
            ctx.status = 401; // Credencial Invalida
            return;
        }

        // // Correcta
        ctx.body = { message: 'Inicio de sesión exitoso', user };
        ctx.status = 200;

    } catch (error) {
        ctx.body = { error: error.message || 'Error en el servidor' };
        ctx.status = 500;
    }
});

module.exports = router;