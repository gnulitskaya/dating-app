import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-quiz-profile',
  templateUrl: './quiz-profile.component.html',
  styleUrls: ['./quiz-profile.component.scss']
})
export class QuizProfileComponent implements OnInit {
  public questionnaireForm: FormGroup = new FormGroup({});
  public step$: BehaviorSubject<number> = new BehaviorSubject(0);
  public questionnaireData = [
    {
      question: "Выберите пол",
      controlName: "gender",
      answers: [
        { value: "male", text: "Мальчик", background: 'var(--male-color)', color: 'var(--text-color)' },
        { value: "female", text: "Девочка", background: 'var(--female-color)', color: 'var(--text-color)' },
      ]
    },
    {
      question: "Выберите окрас",
      controlName: "color",
      answers: [
        { value: "black", text: "Черный", background: '#212020', color: 'var(--text-color)' },
        { value: "brown", text: "Коричневый", background: '#532f17', color: 'var(--text-color)' },
        { value: "beige", text: "Бежевый", background: '#bba494', color: 'var(--dark-color)' },
        { value: "grey", text: "Серый", background: '#565050', color: 'var(--text-color)' },
        { value: "pale-yellow", text: "Палевый", background: '#d4bc92', color: 'var(--dark-color)' },
        { value: "light-red", text: "Светло-рыжий", background: '#c88143', color: 'var(--dark-color)' },
        { value: "auburn", text: "Темно-рыжий", background: '#74210c', color: 'var(--text-color)' },
        { value: "white", text: "Белый", background: '#ede9e3', color: 'var(--dark-color)' },
      ]
    },
    {
      question: "Выберите размер питомца",
      controlName: "size",
      answers: [
        { value: "small", text: "Маленький", background: '#565050', color: 'var(--text-color)' },
        { value: "medium", text: "Средний", background: '#74210c', color: 'var(--text-color)' },
        { value: "large", text: "Большой", background: '#c88143', color: 'var(--dark-color)' },
      ]
    },
    {
      question: "Выберите характер",
      controlName: "character",
      answers: [
        { value: "calm", text: "Спокойный", background: '#565050', color: 'var(--text-color)' },
        { value: "aggressive", text: "Агрессивный", background: '#74210c', color: 'var(--text-color)' },
        { value: "playful", text: "Игривый", background: '#c88143', color: 'var(--dark-color)' },
      ]
    },
    {
      question: "Выберите возраст",
      controlName: "age",
      answers: [
        { value: "young", text: "Молодой", background: '#565050', color: 'var(--text-color)' },
        { value: "middle", text: "Средний", background: '#74210c', color: 'var(--text-color)' },
        { value: "old", text: "Старый", background: '#c88143', color: 'var(--dark-color)' },
      ]
    },
    {
      question: "Выберите породу",
      controlName: "breed",
      answers: [
        { value: "labrador", text: "Лабрадор", background: '#565050', color: 'var(--text-color)' },
        { value: "poodle", text: "Пудель", background: '#74210c', color: 'var(--text-color)' },
      ]
    }
  ]
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.intitializeForm();
  }

  intitializeForm() {
    this.questionnaireForm = this.fb.group({
      // knownAs: ['', Validators.required],
      color: ['', Validators.required],
      size: ['', Validators.required],
      gender: ['', Validators.required],
      character: ['', Validators.required],
      age: ['', Validators.required],
      breed: ['', Validators.required],
    })
    this.questionnaireForm.valueChanges.subscribe(data => {
      console.log(data);
    })
  }

  getControl(name: string) {
    return this.questionnaireForm.get(name) as FormControl<any>;
  }

  switchStepNext() {
    this.step$.next(this.step$.value+1);
  }

  switchStepBack() {
    if(this.step$.value > 0)
    this.step$.next(this.step$.value-1);
  }

}
