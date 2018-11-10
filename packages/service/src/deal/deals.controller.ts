import * as express from 'express'
import { injectable, inject } from 'inversify'
import 'reflect-metadata'
import {
  controller,
  httpGet,
  interfaces,
  httpPost,
  requestParam,
  httpPut,
  httpPatch
} from 'inversify-express-utils'
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPatch
} from '../lib/swagger-express-ts/index'
import { SwaggerDefinitionConstant } from '../lib/swagger-express-ts/swagger-definition.constant'
import { ApiOperationPut } from '../lib/swagger-express-ts/api-operation-put.decorator'
import { DealsService } from './deals.service'






@ApiPath({
  path: '/deals',
  name: 'Deals',
  security: { apiKeyHeader: [] },
})
@controller('/deals')
@injectable()
export class DealsController implements interfaces.Controller {
  public static TARGET_NAME: string = 'DealsController'
  constructor(
    @inject(DealsService.TARGET_NAME) private dealsService: DealsService
  ) {}
  // @ts-ignore
  @ApiOperationGet({
    description: 'Get deals objects list',
    summary: 'Get deals list',
    responses: {
      200: {
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Deal',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet('/')
  public async getDeals(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {

      const data = await this.dealsService.getDeals()
      response.json(data)
  }

  @ApiOperationPost({
    description: 'Post new deal object',
    summary: 'Post new deal',
    parameters: {
      body: { description: 'New deal', required: true, model: 'Deal' },
    },
    responses: {
      200: {
        model: 'Deal',
      },
      400: { description: 'Parameters fail' },
    },
  })
  @httpPost('/')
  public async postDeal(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    if (!request.body) {
      return response.status(400).end()
    }
    const newDeal = request.body
    const deal = await this.dealsService.addDeal(newDeal)
    response.json(deal)
  }

  @ApiOperationPatch({
    description: 'Patch deal object',
    summary: 'Patch an existing deal',
    parameters: {
      body: { description: 'Update deal', required: true, model: 'Deal' },
    },
    responses: {
      200: {
        model: 'Deal',
      },
      400: { description: 'Parameters fail' },
    },
  })
  @httpPatch('/')
  public async patchDeal(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    if (!request.body || !request.body.id) {
      return response.status(400).end()
    }
    const newDeal = request.body
    await this.dealsService.updateDeal(request.body)
    response.json(request.body)
  }
}
