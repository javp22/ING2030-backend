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
createdb <nombre_bdd>

# 4. Crear al usuario y configurarlo en psql
createuser <nombre_usuario>
psql # ingresar a la consola psql
ALTER USER <nombre_usuario> WITH PASSWORD '<password>'; # crear clave para el usuario
GRANT ALL PRIVILEGES ON DATABASE <nombre_bdd> TO <nombre_usuario>; # conceder privilegios al usuario en la base de datos
ALTER USER <nombre_usuario> createdb;
exit # salir de la consola psql

# 5. Conectarse a la base de datos
psql <nombre_bdd>
```

# Indica los comandos de terminal necesarios para inicializar la base de datos acá


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

## Sequelize: Migraciones

Se adjuntan ejemplos (SON LOS DE MI TAREA)

### User
```
yarn sequelize-cli model:generate --name User --attributes username:string
```

### Meme
```
yarn sequelize-cli model:generate --name Meme --attributes title:string,url:string,likeCount:integer,userId:integer
```

### Like
```
yarn sequelize-cli model:generate --name Like --attributes userId:integer,memeId:integer
```

### Comment
```
yarn sequelize-cli model:generate --name Comment --attributes body:string,userId:integer,memeId:integer
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