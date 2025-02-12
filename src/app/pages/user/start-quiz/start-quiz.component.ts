import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent implements OnInit{
  qId=0;
  qTitle='';
  attempted=0;
  marksPerQuestion=0;
  score=0;
  correctAnswers=0;
  isSubmit=false;
  timer = 0;
  questions=[ 
    {
      "questionText": "",
      "option1": "",
      "option2": "",
      "option3": "",
      "option4": "",
      "correctAnswer": "",
      "givenAnswer": "",
      "quiz": {
        "id": 0,
        "title": "",
        "totalMarks": 0,
        "numberOfQuestions": 0
      }
    }
  ]
  constructor(private _locationStr:LocationStrategy,
        private _quest:QuestionService,
        private _route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params?.['id'];
    this.loadQuestions(this.qId);
    this.preventBackButton();
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        alert("Please do not exit fullscreen mode!");
        document.documentElement.requestFullscreen();
      }
    });
  }
  loadQuestions(id:number){
    this._quest.getAllQuestionsOfQuiz(id).subscribe({
      next: (data:any)=>{
        this.questions=data;
        this.qTitle=this.questions?.[0].quiz.title;
        this.marksPerQuestion = this.questions?.[0].quiz.totalMarks/this.questions.length;  
        this.timer = this.questions.length*60;
        this.startTimer();     
        console.log(this.questions);
        this.questions.forEach(q => {
          (q as any).givenAnswer = '';
        });
        
      },
      error: (error)=>{
        Swal.fire({
          icon: "error",
          text: "error in fetching quiz"
        })
      }
    })
  }
  preventBackButton(){

      const elem = document.documentElement; // Fullscreen the whole page
    
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).mozRequestFullScreen) {
        (elem as any).mozRequestFullScreen(); // Firefox
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen(); // Chrome, Safari
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen(); // IE/Edge
      }     
  }

@HostListener('document:keydown', ['$event'])
blockKeys(event: KeyboardEvent) {
  const forbiddenKeys = ['F12', 'Escape', 'Alt', 'Tab', 'Meta', 'Control', 'Shift'];
  if (forbiddenKeys.includes(event.key)) {
    event.preventDefault();
    // alert("Restricted action during the quiz!");
    Swal.fire({
      icon: "warning",
      text: "Restricted action during the quiz!",
      timer: 2000,
      timerProgressBar: true
    })
  }
}

@HostListener('document:contextmenu', ['$event'])
disableRightClick(event: MouseEvent) {
  event.preventDefault();
}
@HostListener('window:beforeunload', ['$event'])
warnBeforeExit(event: BeforeUnloadEvent) {
  event.preventDefault();
  event.returnValue = "Are you sure you want to leave the quiz? Your progress will be lost.";
}

submit(){
  Swal.fire({
    icon: "question",
    text: "Do you really want to submit quiz!",
    timer: 3000,
    timerProgressBar: true
  }).then((result)=>{
    if(result.isConfirmed){
      //calculate Marks
      this.evalQuiz();
      console.log("attempted: ",this.attempted);
      console.log("Score: ", this.score);            
    }
  })
}
startTimer(){
  let t = window.setInterval(()=>{
    if(this.timer<=0){
      this.evalQuiz();
      clearInterval(t);
    }else{
      this.timer--;
    }
  },1000)
}
timeFormatter(){
  let mm = Math.floor(this.timer/60);
  let ss = this.timer-mm*60;
  return `${mm} : ${ss}`
}
evalQuiz(){
  this.isSubmit=true;
  this.questions.forEach((q)=>{
    if(q.givenAnswer != ''){
      this.attempted++;
      if(q.givenAnswer === q.correctAnswer){
        this.correctAnswers++;
        this.score += this.marksPerQuestion
      }
    }
  })
}
}


