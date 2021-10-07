import { injectable, inject } from 'inversify'
import 'reflect-metadata'
import {
    interfaces,
    controller,
    httpGet,
    requestParam, httpPost
} from 'inversify-express-utils'
import {
    ApiPath,
    SwaggerDefinitionConstant,
    ApiOperationGet, ApiOperationPost
} from '../lib/swagger-express-ts'
import * as express from 'express'
import { DriversService } from './drivers.service'
import getKnex, {driversModelColumns, driversTableName} from '../getKnex'

@ApiPath({
    path: '/search/driver',
    name: 'Search driver',
})
@controller('/search/driver')
@injectable()
export class DriverSearchController implements interfaces.Controller {
    public static TARGET_NAME: string = 'DriverSearchController'

    constructor(
        @inject(DriversService.TARGET_NAME) private dealsService: DriversService
    ) {}
    @ApiOperationPost({
        parameters: {
            query: {
                search: { description: 'Search string into drivers', required: true },
            },
        },
        description: 'Search drivers',
        summary: 'Get drivers list by keywords',
        responses: {
            200: {
                type: SwaggerDefinitionConstant.Response.Type.STRING,
                // model: 'Deal',
            },
        },
        security: {
            apiKeyHeader: [],
        },
    })
    @httpPost('/')
    public async searchDeal(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) {
        if (!request.query) {
            return response.status(400).end()
        }
        const knex = await getKnex()

        const words = request.query.search.split(' ')

        const whereClause = words.map( word =>
            '( ' + driversModelColumns.map(col =>  col + " like '%" + word + "%' ").join(' OR ') + ') '
        ).join(' AND ')

        console.log('WHERE CLAUSE', whereClause)
        const result = await knex.select().whereRaw(whereClause).from(driversTableName)


        response.json(result)
    }
}
