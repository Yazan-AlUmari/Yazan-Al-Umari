// form.component.ts - Handles the reactive form for adding/updating items
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
  itemForm: FormGroup;  // Reactive form group
  isEditMode = false;  // Flag for edit vs add
  currentId: number | null = null;

  constructor(
    private fb: FormBuilder,  // FormBuilder for reactive forms
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize form with validators
    this.itemForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],  // ID: positive number only
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],  // Name: no special chars like #, !, ?
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if editing (via route param)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.currentId = +id;
      const item = this.dataService.getItemById(this.currentId);
      if (item) {
        this.itemForm.patchValue(item);  // Load item into form
      }
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const item: IContent = this.itemForm.value;
      if (this.isEditMode && this.currentId !== null) {
        this.dataService.updateItem(this.currentId, item);  // Update
      } else {
        this.dataService.addItem(item);  // Add
      }
      this.itemForm.reset();  // Reset form
      this.router.navigate(['/list']);  // Redirect to list
    }
  }

  onReset(): void {
    this.itemForm.reset();  // Reset form
  }
}
