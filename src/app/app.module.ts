import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { LearningComponent } from './learning/learning.component';
import { QuizComponent } from './quiz/quiz.component';
import { UserComponent } from './user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import * as $ from 'jquery';

const appRoutes: Routes = [
  { path: 'learning', component: LearningComponent },
  { path: 'quiz/:type', component: QuizComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LearningComponent,
    QuizComponent,
    UserComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
