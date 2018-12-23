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
    agreementNumber?: string = 'string'
    @ApiModelProperty()
    agreementDate?: string = 'string'
    @ApiModelProperty()
    signFirstName?: string = 'string'
    @ApiModelProperty()
    signLastName?: string = 'string'
    @ApiModelProperty()
    signMidName?: string = 'string'
    @ApiModelProperty()
    signPosition?: string = 'string'
    @ApiModelProperty()
    signReason?: string = 'string'
    @ApiModelProperty()
    signPassportNumber?: string = 'string'
    @ApiModelProperty()
    signPassportDate?: string = 'string'
    @ApiModelProperty()
    signPassportDepartment?: string = 'string'
    @ApiModelProperty()
    signPassportDepartmentCode?: string = 'string'
    @ApiModelProperty()
    type?: string = 'string' // * - тип (ЮЛ, ИП, ФЛ) = 'string
    @ApiModelProperty()
    fullLegalName?: string = 'string'
    @ApiModelProperty()
    shortLegalName?: string = 'string'
    @ApiModelProperty()
    legalAddress?: string = 'string'
    @ApiModelProperty()
    inn?: string = 'string'
    @ApiModelProperty()
    kpp?: string = 'string'
    @ApiModelProperty()
    ogrn?: string = 'string'
    @ApiModelProperty()
    phone?: string = 'string'
    @ApiModelProperty()
    bankName?: string = 'string'
    @ApiModelProperty()
    BIK?: string = 'string'
    @ApiModelProperty()
    checkingAccount?: string = 'string'
    @ApiModelProperty()
    correspondentAccount?: string = 'string'
    @ApiModelProperty()
    bankComment?: string = 'string'
}
