import { Component, OnInit } from '@angular/core';
import { CatagoryServiceService } from '../../services/catagory-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  pageTitle: string;
  error: string;
  categoryForm: FormGroup;


  constructor(
    private categoriesSrvice: CatagoryServiceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.pageTitle='Edit Category';
      this.categoriesSrvice.getCategory(+id).subscribe(
        res=>{
          this.categoryForm.patchValue({
            category_name: res.category_name,
            id: res.id
          });
        }
      );
    }else{
      this.pageTitle='Create Category';
    }

    this.categoryForm = this.fb.group({
      id: [''],
      category_name: ['', Validators.required],
    });
    
  }

  onSubmit (){
    const formData = new FormData();
    formData.append('category_name', this.categoryForm.get('category_name').value);

    const id = this.categoryForm.get('id').value;
    if(id){
      this.categoriesSrvice.updateCategory(formData, +id).subscribe(
        res =>{
          if(res.status === 'error'){
            this.error = res.message;
          }else{
            this.router.navigate(['/admin/categories']);
          }
        },
        error =>this.error = error
      );
    }else{
      this.categoriesSrvice.createCategory(formData).subscribe(
        res =>{
          if(res.status === 'error'){
            this.error = res.message;
          }else{
            this.router.navigate(['/admin/categories']);
          }
        },
        error =>this.error = error
      );
    }
  }

 

}
