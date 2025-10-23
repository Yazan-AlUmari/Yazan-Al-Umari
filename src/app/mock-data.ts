// mock-data.ts - Defines the initial data structure for items
export interface IContent {
  id: number;
  name: string;
  description: string;
}

export const mockData: IContent[] = [
  { id: 1, name: 'Item 1', description: 'Description for Item 1' },
  { id: 2, name: 'Item 2', description: 'Description for Item 2' },
];
