# ING2030-backend

## Ejecución
```bash
yarn install # instalar dependencias
yarn dev     # iniciar servidor
```

## Postgres
```bash
# 1. inicializar servicio de postgres
sudo service postgresql start

# 2. Crear el usuario de postgres
sudo -i -u postgres

# 3. Crear la base de datos
createdb ing2030

# 4. Crear al usuario y configurarlo en psql
createuser ing2030_user
psql # ingresar a la consola psql
ALTER USER ing2030_user WITH PASSWORD 'ing2030'; # crear clave para el usuario
GRANT ALL PRIVILEGES ON DATABASE ing2030 TO ing2030_user; # conceder privilegios al usuario en la base de datos
ALTER USER ing2030_user createdb;
exit # salir de la consola psql

# 5. Conectarse a la base de datos
psql ing2030
```

## Entorno
Una vez creada la base de datos e inicializado ``psql``, se debe crear un archivo `.env` con lo siguiente

```bash
DB_USERNAME=<nombre_usuario> # Usuario de la base de datos
DB_PASSWORD=<password>       # Clave del usuario
DB_NAME=<nombre_bdd>         # Nombre de la base de datos
DB_HOST=127.0.0.1            # default
DB_DIALECT=postgres          # default
PORT=<puerto>                # Puerto en el que se correrá la aplicacion, de no indicar se toma 3000 como default
```

## Sequelize: Modelos creados
```bash
yarn sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,profilePicture:string

yarn sequelize-cli model:generate --name Transaction --attributes userId:integer,amount:float,company:string,category:string,date:date,description:string,type:string

yarn sequelize-cli model:generate --name Subscription --attributes userId:integer,amount:float,company:string,category:string,billingCycle:string,nextBillingDate:date,isActive:boolean

yarn sequelize-cli model:generate --name SavingGoal --attributes userId:integer,title:string,targetAmount:float,currentAmount:float,period:string,deadline:date,isCompleted:boolean

yarn sequelize-cli model:generate --name Budget --attributes userId:integer,period:string,limitAmount:float,spentAmount:float

yarn sequelize-cli model:generate --name Alert --attributes userId:integer,message:string,date:date,type:string,isRead:boolean
```

## Migraciones
```bash
# Realizar todas las migraciones a la base de datos
yarn sequelize-cli db:migrate

# Si se necesita ir haciendo rollbacks
yarn sequelize-cli db:migrate:undo
```

## Seeds

### Generar seeds
```bash
# Si quieres generar tus propias seeds
yarn sequelize-cli seed:generate --name <nombre_seed>

# Esto generará un archivo en src/seeders que podrás editar
```

### Cargar seeds
```bash
# Cargar todas las seeds incluidas en el directorio src/seeders
yarn sequelize-cli db:seed:all
```

## Rutas

### User
```bash
# Inicio de sesion
POST /users/login
# Parametros solicitud: username, password
# Respuestas:
#   status 200: Inicio de sesion valido, retorna JSON con datos del usuario
#   status 404: Usuario no existe
#   status 401: Contraseña no coincide
#   status 500: Error interno del serivdor

# Creacion de usuario
POST /users/register
# Parametros solicitud: username, email, password
# Respuestas:
#   status 200: Usuario creado correctamente
#   status 409: Usuario ya existe
#   status 500: Error interno del servidor

```

### Transacciones

Dejé ejemplos para usuarios [aqui](https://docs.google.com/spreadsheets/d/1LHrW5rWxMevVtGhdjNU56j_tk_wCzszYP5w2Beg-q0s/edit?usp=sharing). Si hay alguna que quieren editar denle nomas (actualizar el seeder igual!)