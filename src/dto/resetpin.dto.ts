export class ResetPin {
  claroID: string;
  resetToken: string;
  code: string;
  securityPIN: string;
  identificationCard: identificationCard[];
}

export class identificationCard {
  identification: string;
  expeditionDate: string;
}
