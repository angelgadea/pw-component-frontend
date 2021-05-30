export const path = {
    newQuotation: 'new-quotation',
    viewQuotation: 'quoter-quotation-view',
    quoterInbox: 'quoter-inbox',
    approverInbox: 'approver-inbox',
    changePasswordBySystem: 'change-password-by-system',
    changeForgottenPassword: 'change-forgotten-password',
    quoterHistory: 'quoter-history',
    changePasswordOnDemand: 'change-password-on-demand',
    temEvaluation: 'tem-evaluation'
};

export const routePath = {
    newQuotation: '/quote/new-quotation/quotation',
    viewQuotation: '/quoter-quotation-view',
    quoterInbox: '/quote/quoter-inbox',
    approverInbox: '/approver/approver-inbox',
    changePasswordBySystem: '/change-password-by-system',
    changeForgottenPassword: '/change-forgotten-password',
    quoterHistory: '/quoter-history',
    changePasswordOnDemand: '/change-password-on-demand',
    temEvaluation: '/tem-evaluation',
    fileQuotation: '/files-quotation'
};

export const statusCode = {
    fourHundred: 400,
    fiveHundred: 500,
    zero: 0
};

export const document = {
    dni: 1,
    ruc: 2,
    pasaporte: 3,
    carnetDeExtranjeria: 4
};

export const protectionInsurance = [
    {
      id: 1,
      value: 'Sin seguro'
    },
    {
      id: 8,
      value: 'Plan 1 - S/ 8.00'
    },
    {
      id: 10,
      value: 'Plan 2 - S/ 10.00'
    }
];

export const productId = 1;
export const currencyId = 1;

export const periodData = {
  periodId: 2,
  periodFactor: 30
};

export const warrantyData = [
  {
    id: 1,
    warrantyName: 'SIN GARANTIA'
  },
  {
    id: 2,
    warrantyName: 'CON GARANTIA'
  }
];

export const approverLevel = {
  rateAutonomy: null,
  rateOfficeManager: 1,
  rateRegionalManager: 2,
  rateDivisionManager: 3,
  rateIndividualCreditManager: 4,
};

export const statusIdTem = {
  pendingApproverId: 1,
  approveId: 2,
  approveModId: 3,
  rejectedId: 4,
  pendingApproverEleId: 5,
  prePayment: 6,
};


