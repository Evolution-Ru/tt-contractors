import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant
} from '../lib/swagger-express-ts'


@ApiModel({
  description: 'Deal description',
  name: 'Deal',
})
export class DealModel {
  @ApiModelProperty({
    description: 'Id of deal',
    type: SwaggerDefinitionConstant.Model.Property.Type.INTEGER,
    required: true,
  })
  id: number = 0

  @ApiModelProperty()
  ownerFirstName: string = 'string'

  @ApiModelProperty()
  ownerLastName?: string = 'string'

  @ApiModelProperty()
  ownerMidName?: string = 'string'

  @ApiModelProperty()
  ownerPassport?: string = 'string'

  @ApiModelProperty()
  ownerPassportDate?: string = 'string'

  @ApiModelProperty()
  signFirstName?: string = 'string'

  @ApiModelProperty()
  signLastName?: string = 'string'

  @ApiModelProperty()
  signMidName?: string = 'string'

  @ApiModelProperty()
  signPassport?: string = 'string'
  @ApiModelProperty()
  signPassportDate?: string = 'string'
  @ApiModelProperty()
  fullCompanyName?: string = 'string'
  @ApiModelProperty()
  shortCompanyName?: string = 'string'

  // * - тип (ЮЛ, ИП, ФЛ)
  @ApiModelProperty()
  type?: string = 'string'


  @ApiModelProperty()
  inn?: string = 'string'
  @ApiModelProperty()
  kpp?: string = 'string'
  @ApiModelProperty()
  ogrn?: string = 'string'

  @ApiModelProperty()
  agreementNumber?: string = 'string'

  @ApiModelProperty()
  agreementDate?: string = 'string'
}
