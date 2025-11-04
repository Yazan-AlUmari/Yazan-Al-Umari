// form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { IContent } from '../mock-data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  itemForm: FormGroup;
  isEditMode = false;
  currentId: number | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.currentId = +id;
      this.dataService.getItemById(this.currentId).subscribe(
        item => {
          if (item) {
            this.itemForm.patchValue(item);
          }
        },
        error => this.errorMessage = error
      );
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const item: IContent = this.itemForm.value;
      if (this.isEditMode && this.currentId !== null) {
        this.dataService.updateItem(this.currentId, item).subscribe(
          () => this.router.navigate(['/list']),
          error => this.errorMessage = error
        );
      } else {
        this.dataService.addItem(item).subscribe(
          () => this.router.navigate(['/list']),
          error => this.errorMessage = error
        );
      }
      this.itemForm.reset();
    }
  }

  onReset(): void {
    this.itemForm.reset();
  }
}
