import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config()

let DB_STRING: any = process.env.DB_STRING

export const sequelize = new Sequelize(
  DB_STRING,
  // "postgresql://akashsadavarte:@localhost:5432/vbsa",
  // "postgresql://vbsa_be_user:SFeltoWfvMGbSaxZabmmBVg2EHlEeiLF@dpg-cq8cm8aj1k6c73ci1kog-a.oregon-postgres.render.com/vbsa_be",
  // "postgresql://root:SJ5yNHAoPK0YLZyMpiAPb7Sbqh3dyOIm@dpg-cuqtrnbv2p9s73fjm3g0-a.oregon-postgres.render.com/learning_database_8pwn",
  {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    // dialectOptions: {
    //   // ssl: {
    //   //   // require: "true",
    //   // },
    // },
    hooks: {
      afterConnect: async (connection: any) => {
        await connection.query('SELECT set_limit(0.8);');
      },
    },
    pool: {
      max: 50, // Increase max connections
      min: 1,
      acquire: 20000, // Increase timeout (60 seconds)
      idle: 10000
    },
    retry: {
      max: 5 // Retry 5 times before throwing an error
    }
  }
  
);