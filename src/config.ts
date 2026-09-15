export const siteConfig = {
  url: 'https://mugahlogistics.co.ke',
  demoFeaturesEnabled: import.meta.env.VITE_ENABLE_DEMO_FEATURES === 'true',
  payments: {
    mpesaStkEndpoint: import.meta.env.VITE_MPESA_STK_ENDPOINT?.trim() ?? '',
    cardSessionEndpoint: import.meta.env.VITE_CARD_SESSION_ENDPOINT?.trim() ?? '',
    bankName: import.meta.env.VITE_BANK_NAME?.trim() ?? '',
    bankAccountName: import.meta.env.VITE_BANK_ACCOUNT_NAME?.trim() ?? '',
    bankAccountNumber: import.meta.env.VITE_BANK_ACCOUNT_NUMBER?.trim() ?? '',
    bankBranch: import.meta.env.VITE_BANK_BRANCH?.trim() ?? ''
  }
};
