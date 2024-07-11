import { Component, Input, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const FORM_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormButtonToggleComponent),
  multi: true,
};

@Component({
  selector: 'app-form-button-toggle',
  templateUrl: './form-button-toggle.component.html',
  styleUrls: ['./form-button-toggle.component.scss'],
  providers: [FORM_CONTROL_VALUE_ACCESSOR],
})
export class FormButtonToggleComponent implements ControlValueAccessor {
  @Input() formControlData = [
    { value: "male", text: "Мальчик", background: 'var(--male-color)', color: 'var(--text-color)', subtitle: '' },
    { value: "female", text: "Девочка", background: 'var(--female-color)', color: 'var(--text-color)', subtitle: '' },
  ];
  selected!: string;
  disabled = false;
  // private onTouched!: Function;
  private onChanged: (e: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() { }

  selectFormControl(value: string) {
    this.onTouched();
    this.selected = value;
    this.onChanged(value);
  }

  writeValue(value: string): void {
    this.selected = value;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

}
