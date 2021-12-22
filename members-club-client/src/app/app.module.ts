import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberFormComponent } from './components/member-form/member-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberFormComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
