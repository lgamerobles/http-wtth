export class ActivaWtth {
  category: string;
  description:string;
  serviceSpecification:serviceSpecification[];
  relatedParty:relatedParty[];
  place:place[];
  serviceCharacteristic: serviceCharacteristic[];
  state: string;
	type: string;
}

export class serviceSpecification {
    id: string;
    name: string;
    type: string;
}

export class relatedParty {
    id: string;
    name: string;
    expeditionDate: string;
    role: string;
    referredType:string;
}

export class place {
    id: string;
    name: string;
    location: location[];
}

export class location {
    latitude: string;
    longitude: string;
}

export class serviceCharacteristic{
  name: string;
  valueType: string;
  value: string;
}
