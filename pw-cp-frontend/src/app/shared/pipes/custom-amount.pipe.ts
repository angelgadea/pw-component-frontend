import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customAmount'
})
export class CustomAmountPipe implements PipeTransform {

  transform(amount: number): any {
    const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    };
    const customAmountWithLocaleString = Number(amount).toLocaleString('en', options);
    return customAmountWithLocaleString;
    }

}
