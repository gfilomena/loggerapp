import { NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { AppComponent } from './app.component';
import { LogService } from '../service/log.service';
import { HttpClientModule }    from '@angular/common/http';



@NgModule({
  imports:      [ 
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
],
  declarations: [ AppComponent ],
  providers: [ LogService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
