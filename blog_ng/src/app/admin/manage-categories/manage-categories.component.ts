import { Component, OnInit } from '@angular/core';
import { CatagoryServiceService } from '../../services/catagory-service.service';
import { CategoryModel } from '../../models/category-model';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  title = 'Manage Categories';
  categorys: CategoryModel;
  error: string;

  constructor(private categoryService: CatagoryServiceService) { }

  ngOnInit() {
    this.categoryService.getCategorys().subscribe(
      (data:CategoryModel) => this.categorys = data,
      error => this.error = error
    );
  }

}
