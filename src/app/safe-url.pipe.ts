import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeUrl' //nom du pipe crée
})
export class SafeUrlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

//il faut le déclarer dans app.module.ts dans la partie @NgModel