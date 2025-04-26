import { sequelize } from "./db/sequelize";
import { ForeignKeyConstraintError } from "sequelize";

export let test_function = async (tests: any[], execution_function: any) => {
    try {
        let counter = 1
        for (let test of tests) {
            let transaction = await sequelize.transaction();
            try {

                let user = {
                    id: 1,
                    user_id: 1,
                    keycloak_user_id: 1,
                    keycloak_user_name: 'akashs25',
                    role: 'admin',
                    email_id: 'akashs25@gmail.com',
                    first_name: 'Akash',
                    middle_name: 'Pramod',
                    last_name: 'Sadavarte',
                }
                test.input.user = user

                let output: any = await execution_function(test.input, transaction)
                let check_output = await test.check_output(test.input, output)
                if (!check_output) {
                    throw { test, output: output }
                }
                await transaction.rollback();
                console.log(`✅ Test no ${counter++} : `, test.name, '| Test Passed')
            } catch (error: any) {
                await transaction.rollback();
                if (error instanceof ForeignKeyConstraintError) {
                    // console.log(error);
                    console.log(`🔥 Test no ${counter++} : `, test.name, '| Constraint Detected')
                    return {
                        code: 409,
                        message: "Foreign key constraint error: " + error.message,
                    }
                }
                throw error;
            }
        }

    } catch (error: any) {
        // console.log(error)
        console.error('Error in test : ', error.test.name)
        // console.log('Input : ', error.test.input)
        // console.log('----------')
        // console.log('Expected Output : ', error.test.output)
        // console.log('----------')
        // console.log('Actual Output : ', error.output.output)
        // console.log('----------')
        console.error('Conclusion : Test Failed')
        throw error;
    }
}