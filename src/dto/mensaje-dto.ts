export class MessageDto {
  identificationType: string;
  identificationId: string;
  firstName: string;
  lastName: string;
  country: string;
  birthDate: string;
  serviceNumber: string;
  claroID: string;
  password: string;
  pin: string;
  multiFactorAutentication: multiFactorAutenticationDto[];
}

export class multiFactorAutenticationDto {
    enable: boolean;
    factor: string;
}
