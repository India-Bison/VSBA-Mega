import * as fs from 'fs';
import * as path from 'path';
import prompts from 'prompts';
import { dummyFunctionTemplate } from './templates/function.template';

// Convert dash-case to snake_case
const dashToSnakeCase = (str: string): string => {
  return str.replace(/-/g, '_').toLowerCase();
};

// Convert dash-case to PascalCase
const dashToPascalCase = (str: string): string => {
  return str
    .replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase()); // Convert to PascalCase
};

// Main function to generate the file
const generateFunctionFile = async () => {
  const response = await prompts({
    type: 'text',
    name: 'functionPath',
    message: 'Enter the function path (e.g., user/auth/login-user):',
    validate: (path) => /^[a-z0-9/-]+$/.test(path) ? true : 'Path must contain only lowercase letters, numbers, or dashes',
  });

  const functionPath = response.functionPath;
  if (!functionPath) {
    console.log('No function path provided. Exiting...');
    return;
  }

  // Extract the directory and function name
  const pathParts = functionPath.split('/');
  const dashCaseName = pathParts.pop(); // Last part is the function name
  const relativeDir = pathParts.join('/'); // Remaining parts are directories

  // Convert names to appropriate cases
  const snakeCaseName = dashToSnakeCase(dashCaseName); // Convert to snake_case
  const pascalCaseName = dashToPascalCase(dashCaseName); // Convert to PascalCase
  const targetDir = path.join('src', 'shared-functions', relativeDir);
  const filePath = path.join(targetDir, `${dashCaseName}.function.ts`);

  // Ensure the directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Replace placeholders in the template
  const functionContent = dummyFunctionTemplate
    .replace(/{{PascalCaseFunctionName}}/g, pascalCaseName)
    .replace(/{{SnakeCaseFunctionName}}/g, snakeCaseName);

  // Write the file
  fs.writeFileSync(filePath, functionContent.trim(), 'utf8');
  console.log(`Function file created: ${filePath}`);
};

// Run the CLI
generateFunctionFile();
