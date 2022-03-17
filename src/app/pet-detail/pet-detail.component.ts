import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pet } from '../pet';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css'],
})
export class PetDetailComponent implements OnInit {
  pet: Pet | undefined;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPet();
  }

  getPet(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.petService.getPet(id).subscribe((pet) => (this.pet = pet));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.pet) {
      this.petService.updatePet(this.pet).subscribe(() => this.goBack());
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
