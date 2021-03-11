export class RegularizaDto {
  device: device[];
  customer: customer[];
}

export class device {
    device: string;
    serviceNumber: string;
}

export class customer {
    identification: string;
    expeditionDate: string;
}
