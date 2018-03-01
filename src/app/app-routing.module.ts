import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CaseDetailComponent }     from './case-detail.component';
import { CaseSearchComponent }     from './case-search.component';
import { AddCaseComponent }        from './add-case.component';
import { CaseListComponent }       from './case-list.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
  { path: 'detail/:cid', component: CaseDetailComponent },
  { path: 'search',  component: CaseSearchComponent },
  { path: 'list',  component: CaseListComponent },
  { path: 'list/:casesForm',  component: CaseListComponent },
  { path: 'add/:cid',  component: AddCaseComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

