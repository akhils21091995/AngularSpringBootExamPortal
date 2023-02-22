import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  public Editor:any = ClassicEditor;
  qId: any;
  qTitle: any;
  question = {
    quiz: {
      qId: ''
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qId'] = this.qId;
    
    this._question.getQuestion(this.qId).subscribe(
      (data: any) => {
        this.question = data;
        console.log(this.question);
      },
      (error: any) => {
        console.log(error);
      }
    );
    
  }

  formSubmit() {
    

    //form submit
    this._question.updateQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success ', 'Question Updated', 'success').then((e) => {
          this._router.navigate(['/admin/view-questions/'+data.quiz.qId+'/'+this.qTitle] );
        });
        this.question.content = data.content;
        this.question.option1 = data.option1;
        this.question.option2 = data.option2;
        this.question.option3 = data.option3;
        this.question.option4 = data.option4;
        this.question.answer = data.answer;
      },
      (error) => {
        Swal.fire('Error', 'Error in updating question', 'error');
      }
    );
  }
}
