import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { mfRowComponent } from './mfRow.component';
import { teamsComponent } from './teams.component';
import { bestMfsComponent } from './bestMfs.component';
import { BestMfRowComponent } from './bestMfRow.component';
import { MyDataSource } from './myDataSource.datasource';
import { TeamTableComponent } from './teamTable.component';


@NgModule({
  declarations: [
    AppComponent, mfRowComponent, teamsComponent,
    bestMfsComponent, BestMfRowComponent, 
    TeamTableComponent, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MyDataSource],
  bootstrap: [AppComponent]
})
export class AppModule {
}
