export interface EvolutionChain {
  baby_trigger_item: null;
  chain:             Chain;
  id:                number;
}

export interface Chain {
  evolution_details: EvolutionDetail[];
  evolves_to:        Chain[];
  is_baby:           boolean;
  species:           Species;
}

export interface EvolutionDetail {
  base_form_id:            null;
  gender:                  null;
  held_item:               null;
  item:                    null;
  known_move:              null;
  known_move_type:         null;
  location:                null;
  min_affection:           null;
  min_beauty:              null;
  min_damage_taken:        null;
  min_happiness:           null;
  min_level:               number;
  min_move_count:          null;
  min_steps:               null;
  needs_multiplayer:       boolean;
  needs_overworld_rain:    boolean;
  party_species:           null;
  party_type:              null;
  region_id:               null;
  relative_physical_stats: null;
  time_of_day:             string;
  trade_species:           null;
  trigger:                 Species;
  turn_upside_down:        boolean;
  used_move:               null;
}

export interface Species {
  name: string;
  url:  string;
}
