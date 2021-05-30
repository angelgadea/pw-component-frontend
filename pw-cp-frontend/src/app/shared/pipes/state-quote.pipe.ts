import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateQuote'
})
export class StateQuotePipe implements PipeTransform {
  transform(texto: string): any {
    if (texto === 'solicit� una tasa') {
      return 'solicitó una tasa';
      } else if (texto === 'aprob� la solicitud') {
        return 'aprobó la solicitud';
      } else if (texto === 'elev� la solicitud') {
        return 'elevó la solicitud';
      } else {
        return 'rechazó la solicitud';
    }
  }
}
