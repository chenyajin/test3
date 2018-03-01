import { Injectable } from '@angular/core';
import { Headers,Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Case } from './case';
import { Casesform } from './Casesform';
import { Caseproduct  } from './caseproduct';


@Injectable()
export class CasesService {
//	private comurl = "http://mrbs-sit.angelalign.com:1080/opm/service/v4_1/rest.php?";
    private detailurl = "http://opm.shidaits.com/qywx/index.php/Home/service/detail/cid";
    private savewaiturl = "http://opm.shidaits.com/qywx/index.php/Home/service/saveWait";
//  private conditioncases = "http://opm.shidaits.com/qywx/index.php/Home/service/searchCases";

    private headers = new Headers({'Content-Type': 'application/json'});
	  constructor(public http:Http ) { }
	  private comurl="http://mrbs-sit.angelalign.com:1080/opm/service/v4_1/rest.php?";
        doctorurl="";casesurl="";

     findCases(decs: any): Promise<Case[]> {
         this.doctorurl="method=wechatGetCasesList&input_type=json&response_type=json&rest_data=";
         const ss=this.doctorurl + decs;
        const url = this.comurl + ss;
        console.log(url);
        return this.http.get(url)
                   .toPromise()
                   .then(response => JSON.parse(response.json()) as Case[]);
      }
     
     
//  getCases(): Promise<Case[]> {
//  	this.doctorurl="method=wechatGetCasesList&input_type=json&response_type=json&rest_data=";
//      const ss=this.comurl + this.doctorurl;
//      console.log(ss);
//  	return this.http.get(ss)
//  	        .toPromise()
//  	        .then(response => JSON.parse(response.json()) as Case[])
//  }
    
      getCase(cid: any): Promise<Case> {
         this.casesurl="method=wechatGetCaseById&input_type=json&response_type=json&rest_data=";
      	const ss = this.casesurl + cid;
      	const url = this.comurl + ss
      	console.log(url);
      	return this.http.get(url)
      	           .toPromise()
                   .then(response => JSON.parse(response.json()) as Case);
      }
      
     update(cases: Case): Promise<any> {
      	const ss="method=wechatGetCasePauseReason&input_type=json&response_type=json&rest_data=";
      	const url = this.comurl + ss
      	console.log(cases);
      	console.log(url);
	    return this.http
	      .post(url, JSON.stringify(cases), {headers: this.headers})
	      .toPromise()
	      .then(response => alert(JSON.parse(response.json())))
	      .catch(this.handleError);
  }
     sendcaseinfo(caseproduct: Caseproduct): Promise<Caseproduct> {
      	const url = this.savewaiturl;
      	console.log(caseproduct);
	    return this.http
	      .post(url, JSON.stringify(caseproduct), {headers: this.headers})
	      .toPromise()
	      .then(() => caseproduct)
	      .catch(this.handleError);
  }
//      getlist(casesForm:any): Promise<Case[]> {
//    	const url = this.conditioncases;
//    	console.log(casesForm);
//    	console.log(url);
//	    return this.http
//	      .post(url, JSON.stringify(casesForm), {headers: this.headers})
//	      .toPromise()
//	      .then(response => response.json() as Case[]);
//}
        private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
    
 }
