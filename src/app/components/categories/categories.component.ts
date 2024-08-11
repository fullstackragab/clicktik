import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  form!: FormGroup;

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly filterService: FilterService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      category: this.fb.control(''),
    });
    this.categoriesService
      .getCategories()
      .subscribe((categories: any) => (this.categories = categories));
  }

  onChange() {
    this.filterService.filter.next(this.form.value.category);
  }
}
