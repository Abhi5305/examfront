import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.scss']
})
export class ViewQuizQuestionComponent implements OnInit {

  qId=0;
  qTitle='';
  questions=[
    { "id": 1,
      "questionText": "What is the capital of France?",
      "option1": "Berlin",
      "option2": "Madrid",
      "option3": "Paris",
      "option4": "Rome",
      "correctAnswer": "Paris",
      "quiz": {
        "id": 1
      }
    },
    
  ]
  constructor(private _route:ActivatedRoute,
    private _quest:QuestionService
  ){}
  ngOnInit(): void {
    this.qId = this._route.snapshot.params?.['id'];
    this.qTitle = this._route.snapshot.params?.['title'];
    console.log(this.qId);
    console.log(this.qTitle);  
    this._quest.getAllQuestionsOfQuiz(this.qId).subscribe({
      next: (data:any)=>{
        console.log(data);
        this.questions=data;
      },
      error: (error)=>{
        Swal.fire("Error !!","Error in fetching question of this quiz",'error');
      }
    })   
  }

  deleteQuiz(questId: number) {
    Swal.fire({
      icon: 'warning',
      text: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        this._quest.deleteQuestion(questId).subscribe({
          next: (data:any)=>{
            Swal.fire({
              icon: 'success',
              text: 'Deleted Successfully!',
              timer: 2000,
              timerProgressBar: true
            }) 
            this.questions=this.questions.filter((q)=>q.id!=questId);
          },
          error: (error)=>{
            Swal.fire({
              icon: 'error',
              text: 'Error while deleting question!',
              timer: 2000,
              timerProgressBar: true
            })              
          }
        })
      }
    })

  }

}
