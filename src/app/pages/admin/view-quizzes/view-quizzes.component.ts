import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [{
    id: 1,
    title: 'quiz1',
    description: 'description1',
    totalMarks: '',
    numberOfQuestions: '',
    status: '',
    category: {
      id: 1,
      title: 'category1',
    }
  }
]
isActive = false;

toggleStatus() {
  this.isActive = !this.isActive;
}
constructor(private quizService:QuizService,private dialog: MatDialog){}
  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe({
      next: (data:any)=>{
        console.log(data);
        this.quizzes = data;
      },
      error: (error)=>{
        console.log(error);
        Swal.fire("Error !!","Error while fetching quizzes", error);
      }
  })
  }

  deleteQuiz(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log(`Item with ID ${id} deleted`);
      // Proceed with API call for deletion
      this.quizService.deleteQuiz(id).subscribe({
        next: ()=>{
          this.quizzes = this.quizzes.filter(quiz=>quiz.id != id);
          Swal.fire({
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
