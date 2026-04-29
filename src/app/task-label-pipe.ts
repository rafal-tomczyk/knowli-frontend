import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskLabel',
})
export class TaskLabelPipe implements PipeTransform {
  transform(value: string): string {
    const map: Record<string, string> = {
      FIND_ROOTS: "Znajdź miejsca zerowe funkcji",
      MATCH_FORMULA_TO_GRAPH: "Dopasuj wzór do wykresu funkcji",
      CHANGE_FROM: "Zmień postać funkcji"
    };
    return map[value] || value;
  }
}
