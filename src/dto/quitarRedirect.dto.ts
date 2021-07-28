export class quitarRedirect {
  header: header[];
  additionalFields: additionalFields[];
  serviceNumber: number;
  userEmail: string;
  property: property[];
}

export class property{
  id: string;
	value: string;
}

export class header {
  channelId: string;
  companyId: string;
  consumerId: string;
  consumerProfileId: string;
  externalOperation: string;
  externalTransactionDate: string;
  externalTransactionId: string;
  internalTransactionId: string;
  mediaDetailId: string;
  mediaId: string;
  password: string;
  terminal: string;
  token: string;
  userId: string;
  username: string;
  stackTrace: number;
  geoReferenceInfo: geoReferenceInfo[];
}

export class geoReferenceInfo {
  latitude: number;
  longitude: number;
  azimuth: number;
  cellId : string;
}

export class additionalFields {
  additionalField: additionalField[];
}

export class additionalField {
  byteValue: string;
  dataType: string;
  encrypted: string;
  id: string;
  multirecords: multirecords[];
  orderable: boolean;
  searchable: boolean;
  value: string;
}

export class multirecords {
  multirecord: multirecord[];
}

export class multirecord{
  record: string;
}
