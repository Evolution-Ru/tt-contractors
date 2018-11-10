import * as bodyParser from 'body-parser'
import * as express from 'express'
import 'reflect-metadata'
import { Container } from 'inversify'
import {
  interfaces,
  InversifyExpressServer,
  TYPE
} from 'inversify-express-utils'
import { DealsController } from './deal/deals.controller'
import * as swagger from './lib/swagger-express-ts'
import { SwaggerDefinitionConstant } from './lib/swagger-express-ts'
const config = require('../config.json')
import { DealController } from './deal/deal.controller'
import { DealsService } from './deal/deals.service'
import * as _ from 'lodash'
import * as serveStatic from 'serve-static'
import * as path from 'path'
// import models
import './deal/deal.model'
import {SearchController} from './deal/search.controller'
import getKnex from './getKnex'

// set up container
const container = new Container()

// note that you *must* bind your controllers to Controller
container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(DealsController)
  .inSingletonScope()
  .whenTargetNamed(DealsController.TARGET_NAME)
container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(DealController)
  .inSingletonScope()
  .whenTargetNamed(DealController.TARGET_NAME)
container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(SearchController)
    .inSingletonScope()
    .whenTargetNamed(SearchController.TARGET_NAME)
container
  .bind<DealsService>(DealsService.TARGET_NAME)
  .to(DealsService)
  .inSingletonScope()
// create server


const createServer = () => {
    const server = new InversifyExpressServer(container)

    server.setConfig((app: any) => {
        app.use((req: any, res: any, next: any) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
            if (req.method === 'OPTIONS') {
                return res.status(200).send({})
            }
            return next()
        })
        app.use('/api-docs/swagger', express.static('swagger'))
        app.use(
            '/api-docs/swagger/assets',
            express.static('node_modules/swagger-ui-dist')
        )
        app.use(serveStatic(path.join(__dirname, '..', '..', 'front', 'build')))
       
        app.use(bodyParser.json())
        app.use(
            swagger.express({
                definition: {
                    info: {
                        title: 'My api',
                        version: '1.0',
                    },
                    models: {
                        //    Deal : {
                        //        properties : {
                        //            id : {
                        //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
                        //                required : true
                        //            },
                        //            name : {
                        //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
                        //                required : true
                        //            },
                        //            description : {
                        //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING
                        //            },
                        //            deal : {
                        //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING
                        //            },
                        //            author: {
                        //                model: "Author"
                        //            }
                        //        }
                        //    },
                        // Author: {
                        //   properties: {
                        //     id: {
                        //       description: "Id of author",
                        //       type: SwaggerDefinitionConstant.Model.Property.Type.STRING,
                        //       required: true
                        //     },
                        //     name: {
                        //       description: "Name of author",
                        //       type: SwaggerDefinitionConstant.Model.Property.Type.ARRAY,
                        //       itemType:
                        //         SwaggerDefinitionConstant.Model.Property.ItemType.STRING,
                        //       required: true
                        //     }
                        //   }
                        // }
                    },
                    responses: {
                        500: {},
                    },
                    externalDocs: {
                        url: 'My url',
                    },
                    securityDefinitions: {
                        apiKeyHeader: {
                            type: SwaggerDefinitionConstant.Security.Type.API_KEY,
                            in: SwaggerDefinitionConstant.Security.In.HEADER,
                            name: 'apiHeader',
                        },
                    },
                },
            })
        )
    })

    server.setErrorConfig((app: any) => {
        app.use(
            (
                err: Error,
                request: express.Request,
                response: express.Response,
                next: express.NextFunction
            ) => {
                console.error(err.stack)
                response.status(500).send('Something broke!')
            }
        )
    })

    const app = server.build()

    if (!_.isEqual(process.env.NODE_ENV, 'test')) {
        app.listen(config.port, '0.0.0.0')
        console.info('Server is listening on port : ' + config.port)
    }
}

getKnex().then(createServer)
