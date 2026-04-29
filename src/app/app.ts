import { Component, inject } from '@angular/core';
import {Graph} from './graph/graph';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FunctionObject} from './graph/graph.types';
import {toSignal} from '@angular/core/rxjs-interop';
import {Navbar} from './layout/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [Graph, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private http = inject(HttpClient);
  private headers = new HttpHeaders({
    'X-API-Key': 'fastapi-random-key-knowli-backend-a7c4700ae11cc2a958b7004ace9a68f0'
  });

  private exercise$ = this.http.get<FunctionObject>(
    'https://knowli-backend-688258217837.europe-central2.run.app/api/exercises/69baf656a432b19bb3f0f859',
    { headers: this.headers }
  );

  functionObject = toSignal(this.exercise$, { initialValue: null });
}
