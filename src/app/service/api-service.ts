import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  private readonly BASE_URL = "https://pokeapi.co/api/v2/";
  private _http: HttpClient;
  
  constructor() {
    this._http = inject(HttpClient)
  }

  // retrieveJokes(query: string): void {
  //   const url = this.BASE_URL + query;
  //   this._http.get<Jokes>(url).subscribe({
  //     next: (value: any) => {
  //       let jokes = new Jokes();
  //       jokes.query = query;
  //       for(let i=0; i<value.total; i++) {
  //         jokes.jokes.push(value.result[i].value);
  //       }
  //       this._jokes.set(jokes);
  //       this._error.set(false);
  //     },
  //     error: (error: any) => {
  //       let jokes = new Jokes();
  //       this._jokes.set(jokes);
  //       this._error.set(true);
  //     },
  //     complete: () => {}
  //   });
  // }
}

