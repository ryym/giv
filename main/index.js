import bootstrap from './bootstrap';

// Accept some arguments for development.
const args = process.argv.slice(2);
const options = {
  initConfig: args[0] === '--init',
};

bootstrap(options);
