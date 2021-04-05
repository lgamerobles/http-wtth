export class ResetPassword {
  claroID: string;
  resetToken: string;
  password:string;
  identificationCard: identificationCard[];
}

export class identificationCard {
    identify: string;
    expeditionDate: string;
}
