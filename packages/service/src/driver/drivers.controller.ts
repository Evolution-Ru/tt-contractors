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
import { DriversService } from './drivers.service'

@ApiPath({
  path: '/drivers',
  name: 'Drivers',
  security: { apiKeyHeader: [] },
})
@controller('/drivers')
@injectable()
export class DriversController implements interfaces.Controller {
  public static TARGET_NAME: string = 'DriversController'
  constructor(
    @inject(DriversService.TARGET_NAME) private driversService: DriversService
  ) {}
  // @ts-ignore
  @ApiOperationGet({
    description: 'Get drivers objects list',
    summary: 'Get drivers list',
    responses: {
      200: {
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Driver',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet('/')
  public async getDrivers(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {

      const data = await this.driversService.getDrivers(request.query.dealId)
      response.json(data)
  }

  @ApiOperationPost({
    description: 'Post new drivers array',
    summary: 'Post new drivers array',
    parameters: {
      body: { description: 'New deal', required: true, model: 'Deal' , type: 'array'},
    },
    responses: {
      200: {
      },
      400: { description: 'Parameters fail' },
    },
  })
  @httpPost('/')
  public async postDrivers(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    if (!request.body) {
      return response.status(400).end()
    }
    const dealId = parseInt(request.query.dealId, 10)
    const newDrivers = request.body
    await this.driversService.saveDrivers(dealId, newDrivers)
    response.json()
  }

}
