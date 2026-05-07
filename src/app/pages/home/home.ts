import { Component } from '@angular/core';
import {CourseSection} from './components/course-section/course-section';

@Component({
  selector: 'app-home',
  imports: [
    CourseSection
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  e8Items = [
    'Liczby i działania',
    'Ułamki',
    'Procenty',
    'Potęgi',
    'Pierwiastki',
    'Wyrażenia algebraiczne',
    'Równania',
    'Proste, odcinki, kąty',
    'Trójkąty',
    'Czworokąty i wielokąty',
    'Układ współrzędnych',
    'Graniastosłupy',
    'Ostrosłupy',
    'Obliczenia praktyczne',
    'Statystyka',
    'Prawdopodobieństwo'
  ];

  maturaItems = [
    'Liczby rzeczywiste',
    'Wyrażenia algebraiczne',
    'Równania i nierówności',
    'Układy równań',
    'Funkcje',
    'Ciągi',
    'Trygonometria',
    'Planimetria',
    'Geometria analityczna',
    'Stereometria',
    'Kombinatoryka',
    'Rachunek prawdopodobieństwa',
    'Statystyka',
    'Optymalizacja'
  ];
}
