// data.service.ts: Service for CRUD operations on mock data
import { Injectable } from '@angular/core';
import { IContent, mockData } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: IContent[] = [...mockData]; // Copy of mock data for manipulation

  constructor() { }

  // Get all items (Read)
  getItems(): IContent[] {
    return this.items;
  }

  // Add a new item (Create)
  addItem(item: IContent): void {
    this.items.push(item);
  }

  // Update an existing item (Update)
  updateItem(updatedItem: IContent): void {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  }

  // Delete an item (Delete)
  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  // Get next available ID (helper for uniqueness)
  getNextId(): number {
    return Math.max(...this.items.map(item => item.id), 0) + 1;
  }
}
