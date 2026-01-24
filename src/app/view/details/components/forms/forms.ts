import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Pokemon } from '../../../../model/pokemon';
import { PokemonService } from '../../../../service/pokemon-service';
import { Species } from '../../../../model/species';

@Component({
  selector: 'app-forms',
  imports: [],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
})
export class Forms {
  bg = '#d1d0cb';
  outer = '#808080';
  inner = '#c8c8c8';
  text = '#f8f8f8';
  arrowBorder = '#8a8a89';
  arrowInner = '#dfe0df';

  private _pokemonService: PokemonService;

  protected currentPokemon: Signal<Pokemon | null>;
  protected pokemonSpecies: Signal<Species | null>;

  private _forms: Signal<any[]>;
  private _currentIndex!: WritableSignal<number>;

  constructor() {
    this._pokemonService = inject(PokemonService);
    this.currentPokemon = this._pokemonService.currentPokemon;
    this.pokemonSpecies = this._pokemonService.pokemonSpecies;

    this._forms = computed(() => {
      const sprites = this.currentPokemon()?.sprites;
      const forms = [];

      if (sprites?.front_default && sprites?.back_default) {
        forms.push({ type: 'Default', front: sprites.front_default, back: sprites.back_default });
      }
      if (sprites?.front_shiny && sprites?.back_shiny) {
        forms.push({ type: 'Shiny', front: sprites.front_shiny, back: sprites.back_shiny });
      }
      if (sprites?.front_female && sprites?.back_female) {
        forms.push({ type: 'Female', front: sprites.front_female, back: sprites.back_female });
      }
      if (sprites?.front_shiny_female && sprites?.back_shiny_female) {
        forms.push({
          type: 'Shiny female',
          front: sprites.front_shiny_female,
          back: sprites.back_shiny_female,
        });
      }
          this._currentIndex = signal<number>(0);


      return forms;
    });
  }

  get forms(): Signal<any[]> {
    return this._forms;
  }
  get currentIndex(): Signal<any> {
    return this._currentIndex.asReadonly();
  }

  nextForm() {
    const length = this._forms().length;
    if (length === 0) return;

    const newIndex = (this._currentIndex() + 1) % length;
    this._currentIndex.set(newIndex);
  }

  previousForm() {
    const length = this._forms().length;
    if (length === 0) return;

    const newIndex = (this._currentIndex() - 1 + length) % length;
    this._currentIndex.set(newIndex);
  }

}
