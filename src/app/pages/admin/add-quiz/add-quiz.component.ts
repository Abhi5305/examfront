import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit{

  color = 'accent';
  checked = false;
  disabled = false;

  categories = [
    {
      id: '',
      title: '',
      description: '',
    },
  ]
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
  
  constructor(private quizService:QuizService,private categoryService:CategoryService, private snack:MatSnackBar){}
  ngOnInit(): void {
    this.getCategories();

  }
  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (data:any)=>{
        this.categories = data;
        console.log(this.categories);
      },
      error: (error)=>{
        Swal.fire("Error!!","error in loading categories",error);
      }      
    })
  }
  submitQuiz() {
    if(this.quizData.title.trim() == '' || this.quizData.title == null){
      this.snack.open("Title required!!","",{
        duration: 3000,      
      });
      return;
    }
    this.quizService.addQuiz(this.quizData).subscribe({
      next: (data:any)=>{
                this.quizData.title='';
                this.quizData.description='';
                this.quizData.numberOfQuestions='',
                this.quizData.totalMarks='',
                this.quizData.status=this.checked;
                       Swal.fire({
                          title: 'Success',
                          text: data.title,
                          icon: 'success',
                          confirmButtonText: 'Cool',
                          timer: 3000, // 3000ms = 3 seconds
                          timerProgressBar: true, // Optional, shows a progress bar          
                        })
      },
      error: (error:any)=>{
        Swal.fire("Server Error!!","Error while adding quiz", error);
      }
    })
  }
}
