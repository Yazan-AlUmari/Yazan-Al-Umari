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
  currentPage: number = 1;
  pageSize: number = 10;
  sort: string = 'id';
  totalItems: number = 0;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.dataService.getItems(this.currentPage, this.pageSize, this.sort).subscribe(
      response => {
        this.items = response.body;
        this.totalItems = +response.headers.get('X-Total-Count')!;
      },
      error => this.errorMessage = error
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadItems();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset to first page when changing page size
    this.loadItems();
  }

  onSortChange(sort: string): void {
    this.sort = sort;
    this.loadItems();
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
