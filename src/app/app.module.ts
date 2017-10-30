import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// angular flex
import { FlexLayoutModule } from '@angular/flex-layout';

// config module
import { ConfigModule } from '../core';

// state module
import { StateModule } from '../core';

// shared common module
import { SharedModule } from '../core';

// talk module
import { TalkModule } from '../core';
import { TalkShellComponent } from './talk/talk-shell.component';

// app base routes and component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// translation service - i18n core support
import { TranslationModule } from '../core';
// and shell component
import { TranslateShellComponent } from './translate/translate-shell.component';

// environment
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TalkShellComponent,
    TranslateShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ConfigModule.forRoot(),
    StateModule.forRoot(),
    SharedModule.forRoot(),
    TalkModule.forRoot(),
    TranslationModule.forRoot(),
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
