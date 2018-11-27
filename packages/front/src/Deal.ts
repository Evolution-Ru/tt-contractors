
export type Deal = Partial<{
    id: number

    agreementNumber?: string
    agreementDate?: string

    signFirstName?: string
    signLastName?: string
    signMidName?: string
    signPosition?: string
    signReason?: string

    signPassportNumber?: string
    signPassportDate?: string
    signPassportDepartment?: string
    signPassportDepartmentCode?: string

    type?: string // * - тип (ЮЛ, ИП, ФЛ)
    fullLegalName?: string
    shortLegalName?: string
    legalAddress?: string
    inn?: string
    kpp?: string
    ogrn?: string

    phone?: string

    bankName?: string
    BIK?: string
    checkingAccount?: string
    correspondentAccount?: string
    bankComment?: string

}>
