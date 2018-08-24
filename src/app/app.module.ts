import { XlsxImportComponent } from './../components/xlsx-import/xlsx-import.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './../components/navbar/navbar.component';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule, MatMenuModule,
  MatCardModule, MatGridListModule, MatDividerModule, MatListModule, MatRadioModule, MatStepperModule,
  MatTableModule, MatCheckboxModule, MatDialogModule
} from '@angular/material';
import { GeoMatrixService } from '../services/geo-matrix.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    XlsxImportComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatRadioModule,
    MatStepperModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    FlexLayoutModule
  ],
  exports: [HttpClientModule],
  providers: [
    GeoMatrixService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
