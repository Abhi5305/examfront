import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {

  color = 'accent';
  checked = false;
  disabled = false;

  quizData = 
    {
      title: '',
      description: '',
      totalMarks: '',
      numberOfQuestions:'',
      status: this.checked,
      category: {
        id: ''
      }
    }
    
    categories = [
      {
        id: '',
        title: '',
        description: '',
      },
    ]
  qId=0;

  constructor(private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _cat:CategoryService,
    private _router: Router
  ){}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params?.['id'];
    this._quiz.getQuiz(this.qId).subscribe({
      next: (data:any)=>{
        this.quizData=data
        console.log(this.quizData);
      },error: (error)=>{
        console.log(error);
      }
    })
    this._cat.getCategories().subscribe({
      next: (data:any)=>{
        this.categories=data;
      },
      error: (error)=>{
         console.log(error)
      }
    })
  }

  updateQuiz(qId:number,quizData:any){
    this._quiz.updateQuiz(qId,quizData).subscribe({
      next: (data:any)=>{
        this.quizData.status=this.checked;
        Swal.fire("Success!!","Quiz updated",'success').then((route)=>{
          this._router.navigate(["/admin/quizzes"])
        });   
      },error:(error)=>{
        Swal.fire("Error!!","Error in updation quiz",'error')
      }
    })
  }  

}
