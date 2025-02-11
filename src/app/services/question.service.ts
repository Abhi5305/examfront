import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  getAllQuestionsOfQuiz(qId:number){
    return this._http.get(`${baseUrl}/questions/all/quiz/${qId}`);
  }
  getQuestionById(id:number){
    return this._http.get(`${baseUrl}/questions/${id}`);
  }
  addQuestion(questions:any){
    return this._http.post(`${baseUrl}/questions`,questions);
  }
  deleteQuestion(questId:number){
    return this._http.delete(`${baseUrl}/questions/${questId}`);
  }
  updateQuiz(id:number,questions:any){
    return this._http.put(`${baseUrl}/questions/${id}`,questions);
  }
} 
