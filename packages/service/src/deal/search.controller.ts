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
import { DealsService } from './deals.service'
import getKnex, {modelColumns, tableName} from '../getKnex'

@ApiPath({
    path: '/search',
    name: 'Search',
})
@controller('/search')
@injectable()
export class SearchController implements interfaces.Controller {
    public static TARGET_NAME: string = 'SearchController'

    constructor(
        @inject(DealsService.TARGET_NAME) private dealsService: DealsService
    ) {}
    @ApiOperationPost({
        parameters: {
            query: {
                search: { description: 'Search string into deals', required: true },
            },
        },
        description: 'Search deals',
        summary: 'Get deals list by keywords',
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

        const words = request.query.search.split(' ');

        const whereClause = words.map( word =>
            '( ' + modelColumns.map(col =>  col + " like '%" + word + "%' ").join(' OR ') +') '
        ).join(' AND ')
        
        console.log('WHERE CLAUSE', whereClause)
        const result = await knex.select().whereRaw(whereClause).from(tableName)


        response.json(result)
    }
}
