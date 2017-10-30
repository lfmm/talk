import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// talk shell component
import { TalkShellComponent } from './talk/talk-shell.component';

// translate shell component
import { TranslateShellComponent } from './translate/translate-shell.component';

const routes: Routes = [
  { path: 'talk', component: TalkShellComponent },
  { path: 'translate', component: TranslateShellComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
