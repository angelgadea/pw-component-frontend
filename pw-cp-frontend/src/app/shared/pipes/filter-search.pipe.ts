import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(list: any[], text: string): any[] {
    if (text !== undefined) {
      const argument = text.toUpperCase();
      if (!text) { return list; }
      const resultSearch = [];
      for (const quotes of list) {
        if (quotes.fullName.indexOf(argument) > -1 || quotes.identifierCode.indexOf(argument) > -1) {
          resultSearch.push(quotes);
        }
      }
      return resultSearch;
    }
    }
}
