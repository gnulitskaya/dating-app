import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getValueByName'
})
export class GetValueByNamePipe implements PipeTransform {
  transform(value: string, dictionary: any[]): string {
    const item = dictionary.find(item => item.value === value);
    return item ? item.text : '';
  }
}