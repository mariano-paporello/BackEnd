import knex from "knex"
const dbSqLite = knex({
    client: 'sqlite3',
    connection:{
        filename: './ecommerce.sqlite'
    },
    useNullAsDefault: true
})
export default dbSqLite