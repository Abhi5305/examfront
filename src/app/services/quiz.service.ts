import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }
  public getQuizzes(){
    return this.http.get(`${baseUrl}/quizzes`);
  }
  public addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quizzes`,quiz);
  }
  public getQuiz(id:number){
    return this.http.get(`${baseUrl}/quizzes/${id}`);
  }
  public getQuizzesByCategoryId(id:number){
    return this.http.get(`${baseUrl}/quizzes/category/${id}`);
  }
  public updateQuiz(id:number,quiz:any){
    return this.http.put(`${baseUrl}/quizzes/${id}`,quiz);
  }
  public deleteQuiz(id:number){
    return this.http.delete(`${baseUrl}/quizzes/${id}`);
  }
  getQuizByStatus(){
    return this.http.get(`${baseUrl}/quizzes/status`);
  }
  getActiveQuizzesOfCategory(id:number){
    return this.http.get(`${baseUrl}/quizzes/active/category/${id}`);
  }
}