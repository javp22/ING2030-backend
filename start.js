const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function deploy() {
    const { stdout: output1 } = await exec('yarn install');
    console.log('Installing dependencies...');
    console.log(output1);

    const { stdout: output2 } = await exec('yarn sequelize-cli db:migrate');
    console.log('Migrating database...');
    console.log(output2);

    const { stdout: output3 } = await exec('yarn sequelize-cli db:seed:all');
    console.log('Seeding database...');
    console.log(output3);
}

deploy();