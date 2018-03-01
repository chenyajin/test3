import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';
import { CommonModule }  from '@angular/common';

import { CaseDetailComponent } from './case-detail.component';
import { CaseSearchComponent } from './case-search.component';
import { CaseListComponent }    from './case-list.component';
import { AddCaseComponent }    from './add-case.component';
import { CasesService }        from './cases.service';
import { AppComponent }        from './app.component';
import { AppRoutingModule }    from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CaseDetailComponent,
    CaseSearchComponent,
    CaseListComponent,
    AddCaseComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
  CasesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
