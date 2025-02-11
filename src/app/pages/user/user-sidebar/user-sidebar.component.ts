import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit{
  cId=0;
  categories = [
    {
      id: 0,
      title: '',
      description: '',
    }
  ];
  constructor(private _route:ActivatedRoute,
    private _cat:CategoryService
  ){}
  ngOnInit(): void {
    this._cat.getCategories().subscribe({
      next: (data:any)=>{
        this.categories=data;
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          text: 'error while fetching categories',
          timer: 2000,
          timerProgressBar: true
        })
      }
    })
        
  }
}
