import { injectable } from 'inversify'
import 'reflect-metadata'
import { DealModel } from './deal.model'
import * as _ from 'lodash'
import getKnex, {tableName} from '../getKnex'

@injectable()
export class DealsService {
  public static TARGET_NAME: string = 'DealsService'
  private dealList: DealModel[] = [
  ]

  public async getDeals() {
    const knex = await getKnex()
    return knex.select().from(tableName)
  }

  public async  addDeal(deal: DealModel) {
    const knex = await getKnex()
    const newId = await knex.insert([deal], 'id').into(tableName)
    const newDeal = await knex.select().from(tableName).where({id: newId[0]})
      console.log('Add new deal', newDeal)
    return newDeal[0]
  }

  public async  updateDeal({id, ...deal}: DealModel) {
      const knex = await getKnex()
      console.log('update deal', {...deal, id})
      const newDeal = await knex.update(deal).where({id}).into(tableName)

      return {id, ...deal}
  }

  public async  getDealById(id: string) {
    return _.find(this.dealList, (deal: DealModel) => {
      return _.isEqual(deal.id, id)
    })
  }
}
