export class RegularizaDto {
  device: device[];
  customer: customer[];
}

export class device {
    deviceID: string;
    serviceNumber: string;
}

export class customer {
    identification: string;
    expeditionDate: string;
}
