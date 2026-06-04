import { Component, Inject } from '@angular/core';

import { MatButtonModule }
  from '@angular/material/button';

import {

  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle

} from '@angular/material/dialog';
import { MATERIAL_MODULES } from '../../core/imports/material.imports';
import { Product } from '../../core/models/products.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({

  selector: 'app-details-dialog',

  standalone: true,

  imports: [
    MATERIAL_MODULES,
    CurrencyPipe,
    DatePipe,

    MatButtonModule,

    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,


  ],

  templateUrl:
    './details-dialog.ts.component.html',

  styleUrl:
    './details-dialog.ts.component.scss'

})

export class DetailsDialogTsComponent {
  selectedImage = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product) {
    this.selectedImage = data.thumbnail;
  }


}

