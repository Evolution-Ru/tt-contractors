import {injectable, inject} from 'inversify'
import 'reflect-metadata'
import {
    interfaces,
    controller,
    httpGet,
    requestParam
} from 'inversify-express-utils'
import {
    ApiPath,
    SwaggerDefinitionConstant,
    ApiOperationGet
} from '../lib/swagger-express-ts'
import * as express from 'express'
import {DealsService} from './deals.service'

@ApiPath({
    path: '/deals/{id}',
    name: 'Deal',
})
@controller('/deals/:id')
@injectable()
export class DealController implements interfaces.Controller {
    public static TARGET_NAME: string = 'DealController'

    constructor(
        @inject(DealsService.TARGET_NAME) private dealsService: DealsService
    ) {
    }

    @ApiOperationGet({
        description: 'Delete deal object',
        parameters: {
            path: {
                id: {
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true,
                },
            },
        },
        responses: {
            200: {
                model: 'Deal',
            },
            400: {},
        },
    })
    @httpGet('/delete')
    public async deleteDeal(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) {
        response.json(await this.dealsService.deleteDealById(id))
    }

    @ApiOperationGet({
        description: 'Get deal object',
        parameters: {
            path: {
                id: {
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true,
                },
            },
        },
        responses: {
            200: {
                model: 'Deal',
            },
            400: {},
        },
    })
    @httpGet('/')
    public async getDeal(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) {
        response.json(await this.dealsService.getDealById(id))
    }
}
