require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');

const config = {
  url: `jdbc:postgresql://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  locations: [
    `filesystem:${path.resolve(__dirname, 'migrations')}`,
    // `filesystem:${path.resolve(__dirname, 'seeds')}`,
  ].join(','),
  sqlMigrationSuffixes: '.sql',
  schemas: 'public',
  baselineOnMigrate: true,
  validateOnMigrate: true,
  cleanDisabled: 'false',
};

const flywayArgs = Object.entries(config)
  .map(([key, value]) => `-${key}="${value}"`)
  .join(' ');

const command = process.argv[2];

const flywayCommand = `flyway ${flywayArgs} ${command}`;

exec(flywayCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`執行 Flyway 命令時出錯：${error.message}`);
    console.error(stderr);
    process.exit(1);
  }
  console.log(stdout);
});
