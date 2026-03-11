#!/usr/bin/env node

import { Command } from 'commander';
import { generateComponent } from '../lib/generator.js';

const program = new Command();

program
  .name('zk-ui')
  .description('CLI tool for zk-ui component library')
  .version('1.0.0');

program
  .command('generate <name>')
  .description('Generate a new component')
  .option('-t, --type <type>', 'Component type (basic, form, layout, etc.)', 'basic')
  .action(async (name, options) => {
    try {
      await generateComponent(name, options);
      console.log(`✅ Component ${name} generated successfully!`);
    } catch (error) {
      console.error(`❌ Error generating component: ${error.message}`);
      process.exit(1);
    }
  });

program.parse();