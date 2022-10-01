import { Condition } from '../shared/condition.enum'

export class Product {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public owner: string,
    public itemNumber: string,
    public images: string[],
    public isSold: boolean,
    public condition: Condition,
    public category: string
  ) {}
}
