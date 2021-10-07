import {injectable} from 'inversify'
import 'reflect-metadata'
import {DriverModel} from './driver.model'
import getKnex, {driversTableName as tableName} from '../getKnex'

@injectable()
export class DriversService {
    public static TARGET_NAME: string = 'DriversService'

    public async getDrivers(dealId: number) {
        const knex = await getKnex()
        return knex.select().from(tableName).where('dealId', dealId)
    }

    public async saveDrivers(dealId: number, newDrivers: DriverModel[]) {
        const knex = await getKnex()

        await knex(tableName).where('dealId', dealId).delete()

        newDrivers.forEach(newDriver => {
            newDriver.dealId = dealId
        })
        await knex.insert(newDrivers, 'id').into(tableName)
    }

    public async addDeal(deal: DriverModel) {
        const knex = await getKnex()
        const newId = await knex.insert([deal], 'id').into(tableName)
        const newDeal = await knex.select().from(tableName).where({id: newId[0]})
        console.log('Add new deal', newDeal)
        return newDeal[0]
    }

    public async updateDeal({id, ...deal}: DriverModel) {
        const knex = await getKnex()
        console.log('update deal', {...deal, id})
        const newDeal = await knex.update(deal).where({id}).into(tableName)

        return {id, ...deal}
    }

    public async getDealById(id: string) {
        const knex = await getKnex()
        return knex(tableName).where('id', id)
    }

    public async deleteDealById(id: string) {
        const knex = await getKnex()
        await knex(tableName).where('id', id).del()
        return await knex(tableName).select()
    }
}
