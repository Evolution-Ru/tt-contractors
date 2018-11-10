
export type Deal = Partial<{
    id: number
    ownerFirstName: string
    ownerLastName?: string
    ownerMidName?: string
    ownerPassport?: string
    ownerPassportDate?: string
    signFirstName?: string
    signLastName?: string
    signMidName?: string
    signPassport?: string
    signPassportDate?: string
    fullCompanyName?: string
    shortCompanyName?: string
    // * - тип (ЮЛ, ИП, ФЛ)
    type?: string
    inn?: string
    kpp?: string
    ogrn?: string
    agreementNumber?: string
    agreementDate?: string
}>
