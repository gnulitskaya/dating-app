import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable, startWith, tap } from 'rxjs';
import { DictionaryService } from '../../services/dictionary.service';
import { Breed } from '../../models/breeds';

@Component({
  selector: 'app-quiz-profile',
  templateUrl: './quiz-profile.component.html',
  styleUrls: ['./quiz-profile.component.scss']
})
export class QuizProfileComponent implements OnInit {
  public questionnaireForm: FormGroup = new FormGroup({});
  public step$: BehaviorSubject<number> = new BehaviorSubject(0);
  public progress: number = 0;
  public bufferValue = 75;

  public filteredBreeds$!: Observable<Breed[]>;
  public breedsOptions: Breed[] = [];

  public questionnaireData = [
    {
      question: "Выберите пол",
      controlName: "gender",
      answers: [
        { value: "male", text: "Мальчик", background: 'var(--male-color)', color: 'var(--text-color)', subtitle: '' },
        { value: "female", text: "Девочка", background: 'var(--female-color)', color: 'var(--text-color)', subtitle: '' },
      ]
    },
    {
      question: "Выберите окрас",
      controlName: "color",
      answers: [
        { value: "black", text: "Черный", background: '#212020', color: 'var(--text-color)', subtitle: '' },
        { value: "brown", text: "Коричневый", background: '#532f17', color: 'var(--text-color)', subtitle: '' },
        { value: "beige", text: "Бежевый", background: '#bba494', color: 'var(--dark-color)', subtitle: '' },
        { value: "grey", text: "Серый", background: '#565050', color: 'var(--text-color)', subtitle: '' },
        { value: "pale-yellow", text: "Палевый", background: '#d4bc92', color: 'var(--dark-color)', subtitle: '' },
        { value: "light-red", text: "Светло-рыжий", background: '#c88143', color: 'var(--dark-color)', subtitle: '' },
        { value: "auburn", text: "Темно-рыжий", background: '#74210c', color: 'var(--text-color)', subtitle: '' },
        { value: "white", text: "Белый", background: '#ede9e3', color: 'var(--dark-color)', subtitle: '' },
      ]
    },
    {
      question: "Выберите размер питомца",
      controlName: "size",
      answers: [
        { value: "small", text: "Маленький", background: '#565050', color: 'var(--text-color)', subtitle: 'до 10 кг' },
        { value: "medium", text: "Средний", background: '#74210c', color: 'var(--text-color)', subtitle: '10-25 кг' },
        { value: "large", text: "Большой", background: '#c88143', color: 'var(--dark-color)', subtitle: 'свыше 20 кг' },
      ]
    },
    {
      question: "Выберите характер",
      controlName: "character",
      answers: [
        { value: "calm", text: "Спокойный", background: '#565050', color: 'var(--text-color)', subtitle: '' },
        { value: "aggressive", text: "Агрессивный", background: '#74210c', color: 'var(--text-color)', subtitle: '' },
        { value: "playful", text: "Игривый", background: '#c88143', color: 'var(--dark-color)', subtitle: '' },
      ]
    },
    {
      question: "Выберите возраст",
      controlName: "ages",
      answers: [
        { value: "young", text: "Молодой", background: '#565050', color: 'var(--text-color)', subtitle: 'от 0 - 16 недель' },
        { value: "middle", text: "Средний", background: '#74210c', color: 'var(--text-color)', subtitle: 'от 1 до 7 лет' },
        { value: "old", text: "Пожилой", background: '#c88143', color: 'var(--dark-color)', subtitle: 'от 7 лет и старше' },
      ]
    },
    {
      question: "Выберите породу",
      controlName: "breed",
      answers: [
        { value: "labrador", text: "Лабрадор", background: '#565050', color: 'var(--text-color)', subtitle: '' },
        { value: "poodle", text: "Пудель", background: '#74210c', color: 'var(--text-color)', subtitle: '' },
      ]
    },
    {
      question: "Введите его кличку",
      controlName: "name",
      answers: []
    },
  ]
  constructor(private fb: FormBuilder, private dic: DictionaryService) { }

  ngOnInit() {
    this.intitializeForm();
    this.getDictionary();
  }

  intitializeForm() {
    this.questionnaireForm = this.fb.group({
      // knownAs: ['', Validators.required],
      color: ['', Validators.required],
      size: ['', Validators.required],
      gender: ['', Validators.required],
      character: ['', Validators.required],
      ages: ['', Validators.required],
      name: ['', Validators.required],
      breed: ['', Validators.required],
    })
    this.questionnaireForm.valueChanges.subscribe(data => {
      const count = Object.values(data).filter(value => value !== "").length;

      this.progress = (count / 7) * 100;;
      console.log(this.progress, count);
      console.log(data);
    })
  }

  getDictionary() {
    this.dic.getBreeds().pipe(
      tap((breeds: Breed[]) => {
        this.breedsOptions = breeds;
      })
    ).subscribe();

    this.filteredBreeds$ = this.questionnaireForm.controls['breed']?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): Breed[] {
    const filterValue = value.toLowerCase();

    return this.breedsOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getControl(name: string) {
    return this.questionnaireForm.get(name) as FormControl<any>;
  }

  switchStepNext() {
    if (this.step$.value < 6)
    this.step$.next(this.step$.value + 1);
  }

  switchStepBack() {
    if (this.step$.value > 0)
      this.step$.next(this.step$.value - 1);
  }

}
