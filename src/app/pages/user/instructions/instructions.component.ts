import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit{
  qId=0;
  qMark:any;
  qTime=0;
  quizzes = {
    id: 1,
    title: 'quiz1',
    description: 'description1',
    totalMarks: 0,
    numberOfQuestions: 0,
    status: false,
    category: {
      id: 1,
      title: 'category1',
    }
  }

  constructor(private _route: ActivatedRoute,
    private _quiz:QuizService, private _router:Router,
  ){}
  
  ngOnInit(): void {
    this.qId = this._route.snapshot.params?.['id'];
    this._quiz.getQuiz(this.qId).subscribe({
      next: (data:any)=>{
        this.quizzes=data;
        this.qTime = this.quizzes.numberOfQuestions;
        this.qMark = this.quizzes.numberOfQuestions > 0 
        ? parseFloat((this.quizzes.totalMarks / this.quizzes.numberOfQuestions).toFixed(2)) 
        : 0;
            },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          text: "Server error!! Unable to fetch quiz.",
          timer: 2000,
          timerProgressBar: true,
        })
      }
      
    })
  }
  startQuiz(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to start quiz!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Started!",
          text: "Your quiz has been started.",
          icon: "success",
          timer: 1000,
          timerProgressBar: true
        });
        this._router.navigate(['/start/'+this.qId])
      }
    });
  }
}
