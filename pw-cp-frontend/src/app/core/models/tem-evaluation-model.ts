export interface TemEvaluation {
    quotationId: number;
    subproductId: number;
    loanDays: number;
    riskLevel: string;
    loanAmount: number;
    basicSegmentId: number;
    insuranceId: number;
    subproductName: string;
    basicSegmentName: string;
    insuranceName: string;
    customerId: number;
    customerName: string;
    minRate: number;
    maxRate: number;
    firstInstallment: number;
    minRateApprover1: number;
    minRateApprover2: number;
    minRateApprover3: number;
    minRateApprover4: number;
    quoted_rate: any;
    requested_rate: any;
    inmmediateBoss: any;
    positionId: number;
}

export interface TemEvaluationSustentation {
    quotationId: number;
    comment: string;
    currentQuoterName: string;
    currentQuoterFirstSurName: string;
    roleNames: string;
    currentQuoterId: number;
}

export interface DataTemEvaluation {
    negotiatedRate: any;
    commentTemEvaluation: string;
    approvalLevel: number;
    statusId: number;
    inmediateBoss: any;
    approveRate: any;
    requestRate: any;
}
