import * as fs from 'fs';
import * as path from 'path';
import prompts from 'prompts';

// Helper functions to convert cases
const toSnakeCase = (str: string): string => str.replace(/-/g, '_').toLowerCase();
const toPascalCase = (str: string): string =>
    str.replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());
const toTitleCase = (str: string): string =>
    str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

// Replace placeholders in content
const replacePlaceholders = (
    content: string,
    oldName: string,
    newName: string,
    apiPath: string
): string => {
    const oldNameSnake = toSnakeCase(oldName); // `dummy_api`
    const oldNameDash = oldName.toLowerCase(); // `dummy-api`
    const oldNameTitle = toTitleCase(oldName); // `Dummy Api`

    const newNameSnake = toSnakeCase(newName); // `api_name`
    const newNameDash = newName.toLowerCase(); // `api-name`
    const newNameTitle = toTitleCase(newName); // `Api Name`

    return content
        // Replace `dummy_api_path`
        .replace(new RegExp(`dummy_api_path`, 'g'), apiPath)
        // Replace `dummy_api`
        .replace(new RegExp(`${oldNameSnake}`, 'g'), newNameSnake)
        // Replace `dummy-api`
        .replace(new RegExp(`${oldNameDash}`, 'g'), newNameDash)
        // Replace `Dummy Api`
        .replace(new RegExp(`${oldNameTitle}`, 'g'), newNameTitle)

};

// Copy and replace content in files
const copyAndReplace = (
    srcDir: string,
    destDir: string,
    oldName: string,
    newName: string,
    apiPath: string
): void => {
    if (!fs.existsSync(srcDir)) {
        console.error(`Source directory does not exist: ${srcDir}`);
        return;
    }

    fs.mkdirSync(destDir, { recursive: true });

    const files = fs.readdirSync(srcDir);
    files.forEach((file) => {
        const srcFilePath = path.join(srcDir, file);
        const destFileName = replacePlaceholders(file, oldName, newName, apiPath); // Update file name
        const destFilePath = path.join(destDir, destFileName);

        if (fs.lstatSync(srcFilePath).isDirectory()) {
            copyAndReplace(srcFilePath, destFilePath, oldName, newName, apiPath); // Recursive copy
        } else {
            const content = fs.readFileSync(srcFilePath, 'utf8');
            const updatedContent = replacePlaceholders(content, oldName, newName, apiPath); // Update content
            fs.writeFileSync(destFilePath, updatedContent, 'utf8');
        }
    });
};

const main = async () => {
    const response = await prompts([
        {
            type: 'text',
            name: 'apiPath',
            message: 'Enter the API path (e.g., /user/auth/name-of-api-in-dash-case):',
            validate: (path) =>
                /^\/[a-z0-9/-]+$/.test(path) ? true : 'Path must be in dash-case and start with a "/"',
        },
    ]);

    const { apiPath } = response;
    if (!apiPath) {
        console.log('No valid input provided. Exiting...');
        return;
    }

    const relativePath = apiPath.slice(1); // Remove leading slash
    const apiName = relativePath.split('/').pop() || ''; // Extract API name (last part of the path)
    const basePath = relativePath.split('/').slice(0, -1).join('/'); // Extract path without API name
    const srcDir = path.join(__dirname, 'templates', 'dummy-api'); // Template source directory
    const destDir = path.join(__dirname, '..', '..', 'src', 'apis', basePath, apiName); // Destination directory

    // Copy and replace files
    copyAndReplace(srcDir, destDir, 'dummy-api', apiName, apiPath);

    console.log('Files copied and updated successfully!');
};

main();
