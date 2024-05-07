export interface Users {

    id : number;
    name : string ;
    username : string ;
    email : string ;
    password: string;
    address: {
        street: string,
        suite : string,
        city: string,
        zipcode: number
    };
    geo: {
        lat: string,
        lng: string
    };
    phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }

            
}
