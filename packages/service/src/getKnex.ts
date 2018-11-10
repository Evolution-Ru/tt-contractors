import {DealModel} from './deal/deal.model'

const config = require('../config.json')
import * as Knex from 'knex'


function makeRandomString() {
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const l = Math.random() * 20
    for (let i = 0; i < l; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
}

let knexInstance: any
export const tableName = 'deals'
export let modelColumns = [] as string[]

export default async (): Promise<Knex> => {

    if (knexInstance)
        return knexInstance

    const knex = await Knex(config.db)
    await knex.raw(`CREATE DATABASE  IF NOT EXISTS ${config.db.connection.database}`)


    const model = new DealModel()
    modelColumns = Object
        .keys(model)
        .filter(key => key !== 'id')

    console.log('Columns', modelColumns)

    const hasDealsTable = await knex.schema.hasTable('deals')
    console.log('hasDealsTable', hasDealsTable)
    if ((hasDealsTable) !== true) {
        console.log('create table')
        await knex.schema.createTable('deals', (table: Knex.CreateTableBuilder) => {
            modelColumns.map(col => table.string(col))
            table.increments('id')
                .unsigned()
                .unique()
                .primary()
        })
    } else {
        await knex.schema.table('deals', async (table: Knex.CreateTableBuilder) => {
            for (let i = 0; i < modelColumns.length; i++) {
               if ((await knex.schema.hasColumn('deals', modelColumns[i])) === false) {
                   console.log('Has no column', modelColumns[i])
                   await knex.schema.table('deals', (table: Knex.CreateTableBuilder) => table.string(modelColumns[i]))
               }
            }
        })
    }

    const db = knex.table(config.db.connection.database)
    if (config.seed) {
        const array = []
        for (let i = 0; i < config.seed; i++) {
            const {id, ...model}: any = new DealModel()
            modelColumns.forEach( col => model[col] = makeRandomString())

            array.push(model)
        }
        console.log('Seed data into', config.db.connection.database)
        try {
            await knex.insert(array).into(config.db.connection.database)
        }
        catch(e) {
            console.log(e)
        }
        console.log(array[0])
    }
    knexInstance = knex
    return knex
}
