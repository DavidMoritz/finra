import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAaoa_j9g4xjztNrL14vBIfDXzk1ng_us',
      libraries: ['drawing', 'geometry', 'places'], // Specify additional libraries if needed
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
