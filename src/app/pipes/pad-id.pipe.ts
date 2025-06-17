import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padId',
})
export class PadIdPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) {
      return '';
    }
    // Converte para string, e o padStart adiciona '0' à esquerda até ter 3 caracteres
    return value.toString().padStart(3, '0');
  }
}
