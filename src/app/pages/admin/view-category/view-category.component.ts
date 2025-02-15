import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
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
      id: 1,
      title: '',
      description: '',
    }
  ];
  constructor(private categoryService:CategoryService,
              private dialog:MatDialog){}
  ngOnInit(){
    this.categoryService.getCategories().subscribe({ 
      next: (data:any)=>{
        console.log(data);
        this.categories = data;
      },
      error: (error)=>{
        console.log(error);
        Swal.fire("Error !!","Error while fetching categories", 'error');
      }
    });    
  }

  
    deleteCategory(id: number) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Item with ID ${id} deleted`);
        // Proceed with API call for deletion
        this.categoryService.deleteCategory(id).subscribe({
          next: ()=>{
            this.categories = this.categories.filter(cat=>cat.id != id);
            Swal.fire({
              icon: 'success',
              title: 'Deleted Successfully',
              timer: 3000, // 3000ms = 3 seconds
              timerProgressBar: true, // Optional, shows a progress bar          
            })
          }
        })
      }
    });
  
  }
 
  
}
