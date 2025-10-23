// data.service.ts
import { Injectable } from '@angular/core';
import { mockData, IContent } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: IContent[] = [...mockData];  // Copy of mock data for manipulation

  constructor() { }

  // Read: Get all items
  getItems(): IContent[] {
    return this.items;
  }

  // Read: Get a single item by ID
  getItemById(id: number): IContent | undefined {
    return this.items.find(item => item.id === id);
  }

  addItem(item: IContent): void {
    this.items.push(item);
  }

  // Update: Update an existing item by ID
  updateItem(id: number, updatedItem: IContent): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  }

  // Delete: Remove an item by ID
  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }
}
