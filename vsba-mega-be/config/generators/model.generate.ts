import * as fs from 'fs';
import * as path from 'path';
import prompts from 'prompts';
import { dummyModelTemplate } from './templates/model.template';
import { exec } from 'child_process';

// Convert dash-case to snake_case
const dashToSnakeCase = (str: string): string => {
  return str.replace(/-/g, '_').toLowerCase();
};

// Convert dash-case to PascalCase
const dashToPascalCase = (str: string): string => {
  return str
    .replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase()); // Convert to PascalCase
};

function execute_command(command: string, table_name: string) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Database Table Generated Successfully!`);
    process.exit(0);
  })
}

// Main model to generate the file
const generateModelFile = async () => {
  const response = await prompts({
    type: 'text',
    name: 'modelPath',
    message: 'Enter the model path (e.g., user/session):',
    validate: (path) => /^[a-z0-9/-]+$/.test(path) ? true : 'Path must contain only lowercase letters, numbers, or dashes',
  });

  const modelPath = response.modelPath;
  if (!modelPath) {
    console.log('No model path provided. Exiting...');
    return;
  }

  // Extract the directory and model name
  const pathParts = modelPath.split('/');
  const dashCaseName = pathParts.pop(); // Last part is the model name
  const relativeDir = pathParts.join('/'); // Remaining parts are directories

  // Convert names to appropriate cases
  const snakeCaseName = dashToSnakeCase(dashCaseName); // Convert to snake_case
  const pascalCaseName = dashToPascalCase(dashCaseName); // Convert to PascalCase
  const targetDir = path.join('src', 'models', relativeDir);
  const filePath = path.join(targetDir, `${dashCaseName}.model.ts`);

  // Ensure the directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Replace placeholders in the template
  const modelContent = dummyModelTemplate
    .replace(/{{PascalCaseModelName}}/g, pascalCaseName)
    .replace(/{{SnakeCaseModelName}}/g, snakeCaseName);

  // Write the file
  fs.writeFileSync(filePath, modelContent.trim(), 'utf8');
  console.log(`Model file created: ${filePath}`);
  // For Sync Console - bun src/models/apiName.model.ts
  console.log(`Uncomment Sync line and Run this Command`)
  let command = `bun ${targetDir}/${snakeCaseName}.model.ts`
  // Run command
  console.log(command)
  execute_command(command, snakeCaseName + 's')

};

// Run the CLI
generateModelFile();
