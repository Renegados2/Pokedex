import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Pokemon, SimplePokemon } from '../model/pokemon';
import { Species } from '../model/species';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly BASE_URL = 'https://pokeapi.co/api/v2/';
  private readonly PAGINATOR_JUMP: number = 20;

  private _http: HttpClient;

  private _allPokemons: WritableSignal<SimplePokemon[]>;
  private _pokemons: WritableSignal<SimplePokemon[]>;
  private _error: WritableSignal<boolean>;

  private _count: WritableSignal<number>;
  private _next: WritableSignal<string>;
  private _previous: WritableSignal<string>;

  private _currentPokemon: WritableSignal<Pokemon | null>;
  private _pokemonSpecies: WritableSignal<Species | null>;

  public pokemons: Signal<SimplePokemon[]>;

  private currentIndex: number;

  constructor() {
    this._http = inject(HttpClient);
    this._pokemons = signal<SimplePokemon[]>([]);
    this._allPokemons = signal<SimplePokemon[]>([]);
    this._pokemonSpecies = signal(null);
    this._error = signal<boolean>(false);

    this._count = signal<number>(0);
    this._next = signal<string>('');
    this._previous = signal<string>('');

    this._currentPokemon = signal(null);

    this.pokemons = this._pokemons.asReadonly();

    this.currentIndex = 0;
  }

  // Getters

  get error() {
    return this._error.asReadonly();
  }
  get count() {
    return this._count.asReadonly();
  }
  get next() {
    return this._next.asReadonly();
  }
  get previous() {
    return this._previous.asReadonly();
  }
  get currentPokemon(): Signal<Pokemon | null> {
    return this._currentPokemon.asReadonly();
  }
  get pokemonSpecies(): Signal<Species | null> {
    return this._pokemonSpecies.asReadonly();
  }

  set currentPokemon(val: number) {
    const url = this.BASE_URL + 'pokemon/' + val;

    this._http.get<any>(url).subscribe({
      next: (response) => {
        response.name = response.name.charAt(0).toUpperCase() + response.name.slice(1);
        this._currentPokemon.set(response);

        this._error.set(false);
      },
      error: () => {
        this._error.set(true);
      },
    });
  }

  // Functions

  public getPokemons() {
    const url = this.BASE_URL + 'pokemon?limit=100000&offset=0';

    this._http.get<any>(url).subscribe({
      next: (response) => {
        this._count.set(response.count);
        this._next.set(response.next);
        this._previous.set(response.previous);

        this.parseResponse(response);

        this._allPokemons.set(response.results);
        this._error.set(false);
      },
      error: () => {
        this._pokemons.set([]);
        this._error.set(true);
      },
      complete: () => {
        this.currentPokemon = this._allPokemons()[0].id;
        const pokemons = this._allPokemons().slice(0, this.PAGINATOR_JUMP);
        this._pokemons.set(pokemons);
      },
    });
  }

  public previousPage() {
    if (this.currentIndex > 0) {
      const startIndex = this.currentIndex - this.PAGINATOR_JUMP;
      const lastIndex = this.currentIndex;

      const pokemons = this._allPokemons().slice(startIndex, lastIndex);
      this._pokemons.set(pokemons);
      this.currentIndex = startIndex;
    }
  }

  public nextPage() {
    const total = this._allPokemons().length;

    const startIndex = this.currentIndex + this.PAGINATOR_JUMP;

    if (startIndex < total) {
      const lastIndex = Math.min(startIndex + this.PAGINATOR_JUMP, total);

      const pokemons = this._allPokemons().slice(startIndex, lastIndex);

      this.currentIndex = startIndex;
      this._pokemons.set(pokemons);
    }
  }

  public getPokemonById(id: number) {
    if (id !== this._currentPokemon()?.id) {
      const url = this.BASE_URL + 'pokemon/' + id;

      this._http.get<any>(url).subscribe({
        next: (response) => {
          this._currentPokemon.set(response);
          this._error.set(false);
        },
        error: () => {
          this._error.set(true);
        },
        complete: () => {
          this.getPokemonDescription();
        },
      });
    }
  }

  private parseResponse(response: any) {
    for (const pokemon of response.results) {
      const segments: string[] = pokemon.url.split('/');
      pokemon.id = segments[segments.length - 2];
      pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    }
  }

  private getPokemonDescription() {
    const url = this._currentPokemon()?.species.url ?? '';

    this._http.get<any>(url).subscribe({
      next: (response: any) => {
        const texts = response.flavor_text_entries.filter((e: any) => e.language.name === 'en');
        this._pokemonSpecies.set({
          ...response,
          flavor_text: this.getFlavorText(texts),
        });

        this._error.set(false);
      },
      error: () => {
        this._error.set(true);
      },
    });
  }

  protected getFlavorText(texts: any[]): string {
    const length = texts?.length ?? 0;

    const randomIndex = Math.floor(Math.random() * length);

    const text: string = texts?.[randomIndex].flavor_text ?? '';

    return text;
  }
}
