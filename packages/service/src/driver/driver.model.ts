import {ApiModel, ApiModelProperty, SwaggerDefinitionConstant} from '../lib/swagger-express-ts'

@ApiModel({
    description: 'Driver description',
    name: 'Driver',
})
export class DriverModel {
    @ApiModelProperty({
        description: 'Id of driver',
        type: SwaggerDefinitionConstant.Model.Property.Type.INTEGER,
        required: true,
    })
    id: number = 0

    dealId: number = 0

    @ApiModelProperty()
    fullName?: string = 'string'

    @ApiModelProperty()
    phone?: string = 'string'

    @ApiModelProperty()
    birthDate?: string = 'string'

    @ApiModelProperty()
    passportNumber?: string = 'string'

    @ApiModelProperty()
    passportDate?: string = 'string'

    @ApiModelProperty()
    passportDepartment?: string = 'string'

    @ApiModelProperty()
    passportDepartmentCode?: string = 'string'

    @ApiModelProperty()
    addressRegister?: string = 'string'

    @ApiModelProperty()
    addressActual?: string = 'string'

    @ApiModelProperty()
    drivingLicenseNumber?: string = 'string'

    @ApiModelProperty()
    autoName?: string = 'string'

    @ApiModelProperty()
    autoNumber?: string = 'string'
    
    @ApiModelProperty()
    trailerNumber?: string = 'string'

    @ApiModelProperty()
    autoSts?: string = 'string'

    @ApiModelProperty()
    trailerName?: string = 'string'

    @ApiModelProperty()
    trailerSts?: string = 'string'

}
