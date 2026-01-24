import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { PixelBox } from '../components/pixel-box/pixel-box';
import { PokemonService } from '../../service/pokemon-service';
import { Pokemon, SimplePokemon } from '../../model/pokemon';
import { NgClass } from '@angular/common';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly COLORS: any = {
    primary: '#FF512E',
    boxColors: {
      backgroundColor: '#ff0000',
      borderOuterColor: '#000000',
      borderInnerColor: '#000000',
      textColor: '#000000',
      divBackgroundColor: '#ff7585',
      divInnerDivColor: '#ffffff',
    },
    arrowColors: {
      inner: '#dfe0df',
      border: '#8a8a89',
    },
    selectedPokemonBox: {
      border: '#ff6467'
    }
  };

  private _pokeService: PokemonService;

  protected count: Signal<number>;
  protected next: Signal<string>;
  protected previous: Signal<string>;
  protected pokemons: Signal<SimplePokemon[]>;
  protected currentPokemon: Signal<Pokemon | null>


  constructor() {
    this._pokeService = inject(PokemonService);

    this._pokeService.getPokemons();

    this.pokemons = this._pokeService.pokemons;
    this.count = this._pokeService.count
    this.next = this._pokeService.next
    this.previous = this._pokeService.previous

    this.currentPokemon = this._pokeService.currentPokemon
  }

  previousPage() {
    this._pokeService.previousPage()
  }

  nextPage() {
    this._pokeService.nextPage()
  }

  async selectPokemon(pokemon: SimplePokemon) {
    this._pokeService.currentPokemon = pokemon.id
  }

}
