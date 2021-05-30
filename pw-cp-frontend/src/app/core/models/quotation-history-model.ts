export interface QuotationHistory {
    id: number;
    quotationId: number;
    currentQuoterId: number;
    currentApproverId: number;
    statusId: number;
    comment: string;
    quotedRate: number;
    requestedRate: number;
    approvedRate: any;
    mostRecentEvent: number;
    approvalLevel: number;
    enabled: number;
    creatorUser: string;
    creationDate: any;
    modifierUser: string;
    modificationDate: any;
    nameEmployee: string;
    firstSurnameEmployee: string;
    nameEmployeeApprover: string;
    firstSurnameEmployeeApprover: string;
    stateName: string;
    stateActionName: string;
    abbreviationStatus: string;
    positionId: any;
}

