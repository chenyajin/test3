import 'rxjs/add/operator/switchMap';
import { Component} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Case } from './case';
import { Caseproduct } from './caseproduct';
import { CasesService } from './cases.service';

@Component({
  selector: 'add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css'],
})
export class AddCaseComponent  {
	cases:Case;
	public	caseproduct:Caseproduct;
	constructor(
		private casesService: CasesService,
    private route: ActivatedRoute,
    private location: Location) {
    	this.caseproduct = new Caseproduct();
    }
		ngOnInit(): void {
//			this.route.params.subscribe(cases => this.cases = cases);
    this.route.params.subscribe(res =>{
		this.casesService.getCase(JSON.stringify(res)).then(cases => this.cases = cases);
	  })
  }
		
	save(){
		$("#postdata").attr('disabled',true);
		$("#postdata").animate({opacity:"0.8"}).delay(1000).animate({
                    opacity : "1"
                },function(){
                    $("#postdata").attr('disabled',false);
                });
                
//  this.casesService.update(this.cases)
//    .then(() => this.goBack());
}
  goBack(): void {
    this.location.back();
  }
    get checkcases() {
        return JSON.stringify(this.cases);
    }
    get checkcaseproduct() {
        return JSON.stringify(this.caseproduct);
    }
 
     
}