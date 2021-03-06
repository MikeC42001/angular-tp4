import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', pet: { id: 21, name: 'Landreti' } },
      { id: 12, name: 'Narco', pet: { id: 12, name: 'Octavio' } },
      { id: 13, name: 'Bombasto', pet: { id: 13, name: 'BestaBesta' } },
      { id: 14, name: 'Celeritas', pet: { id: 14, name: 'Chirichachi' } },
      { id: 15, name: 'Magneta', pet: { id: 15, name: 'Magma' } },
      { id: 16, name: 'RubberMan', pet: { id: 16, name: 'SuperSuper' } },
      { id: 17, name: 'Dynama', pet: { id: 17, name: 'Escorrega' } },
      { id: 18, name: 'Dr IQ', pet: { id: 18, name: '-IQ' } },
      { id: 19, name: 'Magma', pet: { id: 19, name: 'LumberJack' } },
      { id: 20, name: 'Tornado', pet: { id: 20, name: 'FuriFuri' } },
    ];
    const pets = [
      { id: 21, name: 'Landreti' },
      { id: 12, name: 'Octavio' },
      { id: 13, name: 'BestaBesta' },
      { id: 14, name: 'Chirichachi' },
      { id: 15, name: 'Magma' },
      { id: 16, name: 'SuperSuper' },
      { id: 17, name: 'Escorrega' },
      { id: 18, name: '-IQ' },
      { id: 19, name: 'LumberJack' },
      { id: 20, name: 'FuriFuri' },
    ];

    return { heroes, pets };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
