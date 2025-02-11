import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { icons } from 'ckeditor5';
import { timer } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit{

  selected = 'None';

  qId=0;
  questions=
    {
      "questionText": "",
      "option1": "",
      "option2": "",
      "option3": "",
      "option4": "",
      "correctAnswer": "",
      "quiz": {
        "id": 0
      }
    }
    constructor(private _route:ActivatedRoute,
      private _router: Router,
      private _quest:QuestionService
    ){}
    ngOnInit(): void {
      this.qId=this._route.snapshot.params?.['id'];
      console.log(this.qId);
      this._quest.getQuestionById(this.qId).subscribe({
        next: (data:any)=>{
          this.questions=data;
          console.log(this.questions);          
        },
        error: (error)=>{
          Swal.fire({
            icon: 'error',
            text: 'Error while fetching the question',
            timer: 2000,  
          })          
        }
      })
      
    }
    updateQuiz(id:number,questions:any){
      this._quest.updateQuiz(id,questions).subscribe({
        next: (data:any)=>{
          Swal.fire({
            icon: 'success',
            text: 'Successfully updated the question',
            timer: 2000,  
          }).then((result) => {
            if (result.isConfirmed) {
              window.history.back();
            }
          }); 
        },
        error: (error)=>{
          Swal.fire({
            icon: 'error',
            text: 'Error while updating the question',
            timer: 2000,  
          })
        }
      })
    }
    

}
