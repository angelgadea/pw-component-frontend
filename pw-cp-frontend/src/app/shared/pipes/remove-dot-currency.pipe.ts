import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDotCurrency'
})
export class RemoveDotCurrencyPipe implements PipeTransform {

  transform(value: string): any {
    const textToChange = 'S/.';
    const newValue = 'S/';
    return value.replace(textToChange, newValue);
  }

}
