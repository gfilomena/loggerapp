import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ],
  imports: [CommonModule],
  declarations: []
})
export class MaterialModule { }