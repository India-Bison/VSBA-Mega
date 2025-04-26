import { sequelize } from "./db/sequelize";
import { ForeignKeyConstraintError } from "sequelize";

export let test_function = async (tests: any[], execution_function: any) => {
    let transaction = await sequelize.transaction();
    try {
        let counter = 1
        for (let test of tests) {
            try {
                let output: any = await execution_function(test.input, transaction)
                let check_output = await test.check_output(test.input, output)
                if (!check_output) {
                    throw { test, output: output }
                }
                console.log(`✅ Test no ${counter++} : `, test.name, '| Test Passed')
            } catch (error: any) {
                if (error instanceof ForeignKeyConstraintError) {
                    // console.log(error);
                    console.log(`🔥 Test no ${counter++} : `, test.name, '| Constraint Detected')
                    await transaction.rollback();
                    return {
                        code: 409,
                        message: "Foreign key constraint error: " + error.message,
                    }
                }
                throw error;
            }
        }
        await transaction.rollback();

    } catch (error: any) {
        console.log(error)
        console.error('Error in test : ', error.test.name)
        console.log('Input : ', error.test.input)
        console.log('----------')
        console.log('Expected Output : ', error.test.output)
        console.log('----------')
        console.log('Actual Output : ', error.output.output)
        console.log('----------')
        console.error('Conclusion : Test Failed')
        await transaction.rollback();
        throw error;
    }
}