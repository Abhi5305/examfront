import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quizzes',
  templateUrl: './load-quizzes.component.html',
  styleUrls: ['./load-quizzes.component.scss']
})
export class LoadQuizzesComponent implements OnInit {
  cId=0;
  catTitle=''

  categories =     {
      id: '',
      title: '',
      description: '',
    }
  
  quizzes = 
    [{
      id: '',
      title: '',
      description: '',
      totalMarks: '',
      numberOfQuestions:'',
      status: false,
      category: {
        title: ''
      }
    }]
  constructor(private _route:ActivatedRoute,
    private _cat:CategoryService,private _quiz:QuizService
  ){}

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (data:any)=>{
        this.cId = data.id;
        console.log("categoryId",this.cId);
        if(this.cId==0){
          this._quiz.getQuizByStatus().subscribe({
            next: (data:any)=>{
              this.quizzes=data;
               console.log(this.quizzes);
            },
            error: (error)=>{
              Swal.fire({
                icon: 'error',
                text: 'error while fetching quizzes',
                timer: 2000,
                timerProgressBar: true,
              })  
            }
          })    
        }else{
          console.log("load "+this.cId+" quiz");  
          this._quiz.getActiveQuizzesOfCategory(this.cId).subscribe({
            next: (data:any)=>{
              this.quizzes=data;
              console.log("Category of",this.cId," is "+this.quizzes);
              
            },
            error: (error)=>{
              Swal.fire({
                icon: 'error',
                text: 'Unable to fetch quizzes of category!',
                timer: 2000,
                timerProgressBar: true,
              })
            }
          })
        }
        
      }
    })

  }

}
