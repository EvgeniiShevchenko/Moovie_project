export class CreateFilterDTO {
    readonly curentpage: number;
    readonly itemName: string;
    readonly skip: number;
    readonly limit: number;
    readonly filter: object;
    readonly search: object;
  }