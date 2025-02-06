import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  categories = 
    {
    title: '',
    description: ''
  }
  constructor(private category:CategoryService, private snack:MatSnackBar ){}
  formSubmit(){
    if(this.categories.title.trim() == ''|| this.categories.title == null){
      this.snack.open("title","Title is required",{
        duration: 3000
      })
    }
    this.category.addCategories(this.categories).subscribe({
      next: (data:any)=>{
        this.categories.title='';
        this.categories.description='';
        Swal.fire({
                  title: 'Success',
                  text: data.title,
                  icon: 'success',
                  confirmButtonText: 'Cool',
                  timer: 3000, // 3000ms = 3 seconds
                  timerProgressBar: true, // Optional, shows a progress bar          
                })
      },
      error: (error)=>{
        Swal.fire("Server Error!!","Error while adding category", error);
      }
    })
  }
}
