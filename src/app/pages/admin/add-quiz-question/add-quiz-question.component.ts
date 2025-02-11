import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-quiz-question',
  templateUrl: './add-quiz-question.component.html',
  styleUrls: ['./add-quiz-question.component.scss']
})
export class AddQuizQuestionComponent implements OnInit{

  selected = 'None';

  qId=0;
  qTitle='';
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
    private _quest:QuestionService
  ){}
  
  ngOnInit(): void {
    this.qId = this._route.snapshot.params?.['id'];
    this.questions.quiz.id=this.qId;
    this.qTitle = this._route.snapshot.params?.['title'];
    console.log(this.qId);
    console.log(this.qTitle);     
  }
  saveQuestion() {
    this._quest.addQuestion(this.questions).subscribe({
      next: (data:any)=>{
        if(this.questions.questionText.trim()==''||this.questions.questionText==null){
          return;
        }
        if(this.questions.option1.trim()==''||this.questions.option1==null){
          return;
        }
        if(this.questions.option2.trim()==''||this.questions.option2==null){
          return;
        }
        if(this.questions.correctAnswer.trim()==''||this.questions.correctAnswer==null){
          return;
        }
        Swal.fire({
          title: 'success',
          text: 'Question saved successfully!',
          timer: 2000,
          icon: 'success'
        })
      },
      error: (error)=>{
        Swal.fire({
          title: 'error',
          text: 'Error while adding question!',
          timer: 2000,
          icon: 'error'
        })
      }
    })
  }
}
