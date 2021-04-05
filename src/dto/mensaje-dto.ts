export class MessageDto {
  firstName: string;
  lastName: string;
  country: string;
  serviceNumber: string;
  birthDate: string;
  claroID: string;
  nationalIdentifyCard: nationalIdentifyCard[];
  channel: channel[];
  securityPIN: number;
  password: string;
  multiFactorAutentication: multiFactorAutenticationDto[];
  notifications:notifications[];
  characteristics:characteristics[];
  contactMedium:contactMedium[];
}

export class nationalIdentifyCard {
  identify: string;
  expeditionDate: string;
}

export class channel {
    id: string;
    description: string;
}

export class multiFactorAutenticationDto {
    enable: boolean;
    factor: string;
}

export class notifications {
    key: string;
    value: string;
}

export class characteristics {
    key: string;
    value: string;
}

export class contactMedium {
  enable: boolean;
  type: string;
  value:string;
}
