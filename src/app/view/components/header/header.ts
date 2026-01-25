import { HttpClient } from '@angular/common/http';
import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { PixelBox } from '../pixel-box/pixel-box';
import { RouterLink } from '@angular/router';
import { PokemonService } from '../../../service/pokemon-service';
import { Pokemon } from '../../../model/pokemon';

@Component({
  selector: 'app-header',
  imports: [PixelBox, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  bg = '#d1d0cb';
  outer = '#808080';
  inner = '#c8c8c8'
  text = '#f8f8f8'
  arrowBorder = '#8a8a89'
  arrowInner = '#dfe0df'

  protected readonly NAV_BUTTONS: string[] = ['info', 'data', 'forms']
  protected navSVGs: WritableSignal<{ [key: string]: string }>
  private _http: HttpClient;

  private _pokemonService: PokemonService

  private loadedCount = 0;

  protected loaded: WritableSignal<boolean>;

  constructor() {
    this._pokemonService = inject(PokemonService)
    this._http = inject(HttpClient);
    this.navSVGs = signal<{ [key: string]: string }>({})
    this.loaded = signal<boolean>(false)

    for (const buttonText of this.NAV_BUTTONS) {
      this._http
        .get('assets/text_svg/' + buttonText + '_text.svg', { responseType: 'text' })
        .subscribe((svg) => {
          this.navSVGs.update((current) => {return {...current, [buttonText]: svg}})
          this.loadedCount++;
          if(this.loadedCount == this.NAV_BUTTONS.length) {
            this.loaded.set(true)
          }
        });
    }
  }

  get currentPokemon(): Signal<Pokemon | null> {
    return this._pokemonService.currentPokemon;
  }

  nextPokemon() {
    const nextId = (this.currentPokemon()?.id ?? 0) + 1
    this._pokemonService.getPokemonById(nextId)
  }

  previousPokemon() {
    const nextId = (this.currentPokemon()?.id ?? 0) - 1
    this._pokemonService.getPokemonById(nextId)
  }
}
