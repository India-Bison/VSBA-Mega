export const dummyFunctionTemplate = `
export interface {{PascalCaseFunctionName}}Input {
  // Define input properties here
}

export interface {{PascalCaseFunctionName}}Output {
  // Define output properties here
}

export const {{SnakeCaseFunctionName}} = (data: {{PascalCaseFunctionName}}Input): {{PascalCaseFunctionName}}Output => {
  console.log('Function {{SnakeCaseFunctionName}} executed with data:', data);
  return {
    // Define output properties here
  };
};
`;
