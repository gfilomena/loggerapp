import { NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LogService } from '../service/log.service';
import { HttpClientModule }    from '@angular/common/http';
import { ParserComponent } from '../parser/parser.component';


@NgModule({
  imports:      [ 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
],
  declarations: [ AppComponent, ParserComponent ],
  providers: [ LogService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
