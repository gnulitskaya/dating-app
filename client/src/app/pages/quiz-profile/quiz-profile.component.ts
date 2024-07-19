import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable, startWith, tap } from 'rxjs';
import { DictionaryService } from '../../services/dictionary.service';
import { Breed } from '../../models/breeds';
import { MembersService } from '../../services/members.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Member } from '../../models/member';
import { Router } from '@angular/router';
import { DadataService } from '../../services/dadata.service';

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
  public cities: any;
  // public member!: Member;

  public filteredBreeds$!: Observable<Breed[]>;
  public breedsOptions: Breed[] = [];

  public questionnaireData: any[] = [];

  constructor(private fb: FormBuilder, private dic: DictionaryService,
    private memberService: MembersService,
    private snackbarService: SnackbarService,
    private _router: Router,
    private dadataService: DadataService
  ) { }

  ngOnInit() {
    this.getCitySuggestions('м');
    this.intitializeForm();
    this.getDictionary();

    this.questionnaireData = [
      {
        question: "Выберите пол",
        controlName: "gender",
        answers: this.dic.genders
      },
      {
        question: "Выберите окрас",
        controlName: "color",
        answers: this.dic.colors
      },
      {
        question: "Выберите размер питомца",
        controlName: "size",
        answers: this.dic.sizes
      },
      {
        question: "Выберите характер",
        controlName: "character",
        answers: this.dic.character
      },
      {
        question: "Выберите возраст",
        controlName: "age",
        answers: this.dic.ages
      },
      {
        question: "Выберите породу",
        controlName: "breed",
        answers: []
      },
      {
        question: "Введите его кличку",
        controlName: "knownAs",
        answers: []
      },
      {
        question: "Введите город",
        controlName: "city",
        answers: []
      },
    ]
  }

  intitializeForm() {
    this.questionnaireForm = this.fb.group({
      // knownAs: ['', Validators.required],
      color: ['', Validators.required],
      size: ['', Validators.required],
      gender: ['', Validators.required],
      character: ['', Validators.required],
      age: ['', Validators.required],
      knownAs: ['', Validators.required],
      breed: ['', Validators.required],
      city: ['', Validators.required],
    })
    this.questionnaireForm.valueChanges.subscribe(data => {
      const count = Object.values(data).filter(value => value !== "").length;

      this.progress = (count / 8) * 100;;
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
    if (this.step$.value < 7)
      this.step$.next(this.step$.value + 1);
  }

  switchStepBack() {
    if (this.step$.value > 0)
      this.step$.next(this.step$.value - 1);
  }

  updateMember() {
    this.memberService.updateMember(this.questionnaireForm.value).subscribe(
      (member: Member) => {
        console.log(member);
        this.snackbarService.openSnackBar('Данные успешно обновлены!', '');
        this._router.navigateByUrl('/member/edit');
      }
    )
  }

  getCitySuggestions(e: any) {
    this.dadataService.searchAddress(e, "ADDRESS", "city").subscribe((data: any) => {
      this.cities = data;
    });
  }


}
