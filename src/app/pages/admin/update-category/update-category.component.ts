import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit{
    categories = 
      {
      title: '',
      description: ''
    }
    catId=0;
    constructor(private category:CategoryService, 
      private snack:MatSnackBar,
      private _route: ActivatedRoute  ){}
    ngOnInit(): void {
      this.catId = this._route.snapshot.params?.['id'];
      this.category.getCategoryById(this.catId).subscribe({
        next: (data:any)=>{
          this.categories=data;
        }
      })  
    }
    formSubmit(catId:number,categories:any){
      if(this.categories.title.trim() == ''|| this.categories.title == null){
        this.snack.open("title","Title is required",{
          duration: 3000
        })
      }
      this.category.updateCategory(this.catId,this.categories).subscribe({
        next: (data:any)=>{
          Swal.fire({
                    title: 'Success',
                    text: "category Updated Successfully!!",
                    icon: 'success',
                    confirmButtonText: 'Cool',
                    timer: 3000, // 3000ms = 3 seconds
                    timerProgressBar: true, // Optional, shows a progress bar          
                  })
        },
        error: (error)=>{
          Swal.fire("Server Error!!","Error while updating category", 'error');
        }
      })
    }
}
