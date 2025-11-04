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
  errorMessage: string = '';

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.dataService.getItems().subscribe(
      items => this.items = items,
      error => this.errorMessage = error
    );
  }

  onEdit(id: number): void {
    this.router.navigate(['/form', id]);
  }

  onDelete(id: number): void {
    this.dataService.deleteItem(id).subscribe(
      () => this.loadItems(),
      error => this.errorMessage = error
    );
  }

  onAdd(): void {
    this.router.navigate(['/form']);
  }
}
