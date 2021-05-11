export class ResetPassword {
  claroID: string;
  resetToken: string;
  code:string;
  password:string;
  identificationCard: identificationCard[];
}

export class identificationCard {
    identify: string;
    expeditionDate: string;
}
