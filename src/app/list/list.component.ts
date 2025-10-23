// list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { IContent } from '../mock-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items: IContent[] = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadItems();  // Load items on init
  }

  loadItems(): void {
    this.items = this.dataService.getItems();  // Get all items
  }

  onEdit(id: number): void {
    this.router.navigate(['/form', id]);  // Navigate to form for editing
  }

  onDelete(id: number): void {
    this.dataService.deleteItem(id);  // Delete item
    this.loadItems();  // Refresh list
  }

  onAdd(): void {
    this.router.navigate(['/form']);  // Navigate to form for adding
  }
}
