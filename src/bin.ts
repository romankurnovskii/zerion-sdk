#!/usr/bin/env node
import {Command} from 'commander';
import {createZerionClient} from './index.js';

const program = new Command();

program.name('zerion').description('Zerion API SDK').version('1.0.0');

program
  .option('-k, --api-key <key>', 'Zerion API key')
  .option('-a, --address <address>', 'Wallet address to query')
  .action(options => {
    if (!options.apiKey) {
      console.error('Error: --api-key is required');
      process.exit(1);
    }

    const client = createZerionClient({apiKey: options.apiKey});

    if (options.address) {
      console.log(`Fetching portfolio for wallet: ${options.address}`);
      client
        .getWalletPortfolio(options.address)
        .then(data => {
          console.log(JSON.stringify(data, null, 2));
        })
        .catch(err => {
          console.error('Error:', err.message);
        });
    } else {
      console.log('Zerion SDK initialized. Use --address to query wallet data.');
    }
  });

program.parse();
