// mock-data.ts: Mock data for content items
export interface IContent {
  id: number;
  title: string;
  description: string;
  category: string;
}

export const mockData: IContent[] = [
  { id: 1, title: 'Sample Title 1', description: 'Sample description 1', category: 'Tech' },
  { id: 2, title: 'Sample Title 2', description: 'Sample description 2', category: 'Health' },
];
