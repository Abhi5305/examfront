import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
  categories = [
    {
      title: '',
      description: '',
    }
  ];
  constructor(private categoryService:CategoryService){}
  ngOnInit(){
    this.categoryService.getCategories().subscribe({ 
      next: (data:any)=>{
        console.log(data);
        this.categories = data;
      },
      error: (error)=>{
        console.log(error);
        Swal.fire("Error !!","Error while fetching categories", error);
      }
    });    
  }
 
  
}
