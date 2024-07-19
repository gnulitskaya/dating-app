import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getColorByName'
})
export class GetColorByNamePipe implements PipeTransform {
  transform(value: string, dictionary: any[]): string {
    const item = dictionary.find(item => item.value === value);
    console.log(item);
    return item ? item.background : '';
  }
}