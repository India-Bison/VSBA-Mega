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
  let modelContent = dummyModelTemplate
    .replace(/{{PascalCaseModelName}}/g, pascalCaseName)
    .replace(/{{SnakeCaseModelName}}/g, snakeCaseName);

  // Replace // Command to Run : with command in front
  let command = `bun ${targetDir}/${snakeCaseName}.model.ts`
  modelContent = modelContent.replace(/\/\/ Command to Run :/g, '//Command to Run : ' + command);

  // Write the file
  fs.writeFileSync(filePath, modelContent.trim(), 'utf8');
  console.log(`Model file created: ${filePath}`);

};

// Run the CLI
generateModelFile();
