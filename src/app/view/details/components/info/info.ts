import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { Pokemon } from '../../../../model/pokemon';
import { PokemonService } from '../../../../service/pokemon-service';
import { Species } from '../../../../model/species';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.html',
  styleUrl: './info.css',
})
export class Info {
 private _pokemonService: PokemonService;

  protected currentPokemon: Signal<Pokemon | null>;
  protected pokemonSpecies: Signal<Species | null>;

  private _audio: WritableSignal<string>;

  constructor() {
    this._pokemonService = inject(PokemonService);
    this.currentPokemon = this._pokemonService.currentPokemon;
    this.pokemonSpecies = this._pokemonService.pokemonSpecies;

    this._audio = signal<string>('');
  }

  get audio() {
    return this._audio.asReadonly();
  }

  protected playSound(audioEl: HTMLAudioElement) {
    const url =
      Math.random() * 10 > 7
        ? this.currentPokemon()?.cries.legacy
        : this.currentPokemon()?.cries.latest;

    if (!url) return;

    if (audioEl.src !== url) {
      audioEl.src = url;
    }

    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
  }
}

