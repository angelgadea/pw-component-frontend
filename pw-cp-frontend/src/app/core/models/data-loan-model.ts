export interface DataLimitAmount {
    minAmount: number;
    maxAmount: number;
}
export interface DataPeriod {
    id: any;
    name: any;
    periodFactor: any;
}

export interface DataLimitPeriod {
    id: any;
    minPeriod: any;
    maxPeriod: any;
}

export interface DataLoan {
    period: any;
    amount: any;
    currencyId: number;
    currencyName: string;
    limitMinAmount: number;
    limitMaxAmount: number;
    periodId: number;
    periodName: string;
    periodFactor: any;
    limitMinPeriod: any;
    limitMaxPeriod: any;
    warrantyId: number;
    warrantyName: string;
    disbursementDate: any;
    payDay: any;
    protectionInsurance: any;
    protectionInsuranceName: string;
}

export interface DataClientAndNotClientForCalculateRate {
    customerId: any;
    fTop: number;
    subproductId: number;
    currencyId: number;
    warrantyId: number;
    basicSegmentId: number;
    commercialProfileId: number;
    modeId: number;
    periodId: number;
    periodFactor: number;
    period: number;
    loanAmount: number;
    officeId: number;
}
