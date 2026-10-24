export class Stock {
  constructor(
    public name: string = '',
    public code: string = '',
    public price: number = 0,
    public previousPrice: number = 0,
    public favorite: boolean = false,
    public exchange: string = '',
    public id?: number,
  ) {}
}

export const EXCHANGES = ['NASDAQ', 'NSE', 'NYSE', 'HOSE', 'HNX', 'UPCoM'];

export function sampleStocks(): Stock[] {
  return [
    new Stock('Test Stock Company', 'TSC', 85, 80, false, 'NASDAQ', 1),
    new Stock('Second Stock Company', 'SSC', 10, 20, false, 'NSE', 2),
    new Stock('Last Stock Company', 'LSC', 876, 765, false, 'NYSE', 3),
  ];
}
