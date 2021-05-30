export interface DataRate {
    id: number;
    customerId: number;
    minRate: any;
    maxRate: any;
    optimalRate: any;
    rateOfficeManager: any;
    rateRegionalManager: any;
    rateDivisionManager: any;
    rateIndividualCreditManager: any;
    rateAgreed: any;
    typeOfCurrency: string;
    commentRatePreferential: string;
    installment: any;
    approvalLevel: any;
    approvalLevelPosition: string;
}
export interface DataForFirstInstallment {
    loanAmount: number;
    periodId: number;
    periodFactor: number;
    period: number;
    rate: number;
}
export interface DataNewQuotation {
    currencyId: number;
    fTop: number;
    incomeRangeId: number;
    modeId: number;
    subproductId: number;
    warrantyId: number;
    customerId: number;
    loanAmount: number;
    period: number;
    periodFactor: number;
    creatorUser: number;
    userId: any;
    quotedRate: any;
}
export interface DataNewRequestQuotation {
    userId: any;
    currencyId: any;
    incomeRangeId: any;
    modeId: any;
    subproductId: any;
    warrantyId: any;
    customerId: any;
    loanAmount: any;
    period: any;
    periodFactor: any;
    quotedRate: any;
    requestedRate: any;
    creatorUser: string;
    comment: any;
}


