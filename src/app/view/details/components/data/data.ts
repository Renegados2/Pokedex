import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { Pokemon } from '../../../../model/pokemon';
import { PokemonService } from '../../../../service/pokemon-service';
import { Species } from '../../../../model/species';
import { EvolutionChain } from '../../../../model/evolution';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-data',
  imports: [NgClass],
  templateUrl: './data.html',
  styleUrl: './data.css',
})
export class Data {
  private _pokemonService: PokemonService;

  protected currentPokemon: Signal<Pokemon | null>;
  protected pokemonSpecies: Signal<Species | null>;
  protected pokemonEvolutionChain: Signal<EvolutionChain | null>;

  private _audio: WritableSignal<string>;

  constructor() {
    this._pokemonService = inject(PokemonService);
    this.currentPokemon = this._pokemonService.currentPokemon;
    this.pokemonSpecies = this._pokemonService.pokemonSpecies;
    this.pokemonEvolutionChain = this._pokemonService.pokemonEvolutionChain;

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

  getPokemonEvolutionsNames(): string[] {
    const result: string[] = [];
    const chain = this.pokemonEvolutionChain()?.chain;

    const traverse = (node: any) => {
      if (!node) return;

      result.push(node.species.name);

      for (const next of node.evolves_to ?? []) {
        traverse(next);
      }
    };

    traverse(chain);
    return result;
  }
}
