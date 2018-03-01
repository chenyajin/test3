import 'rxjs/add/operator/switchMap';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params ,Router} from '@angular/router';
import { Location }               from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Case } from './case';
import { CasesService } from './cases.service';

declare var $:any;
@Component({
  selector: 'case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css'],
})
export class CaseDetailComponent implements OnInit {
	title = "病历详情";
	cases:Case;
	casesid:FormGroup;
	constructor(
		private fb:FormBuilder,
		private router: Router,
		private casesService: CasesService,
    private route: ActivatedRoute,
    private location: Location) {
    	this.createform();
    }
    
  createform(){
  	    this.casesid = this.fb.group({
    	  cid:''
    })
  }
    
		ngOnInit(): void {
			this.route.params.subscribe(res =>{
		this.casesService.getCase(JSON.stringify(res)).then(cases => this.cases = cases);
	  })
      console.log(this.cases);
		}
	pauseReason(){
		var pausereason=$("#pauseReason").val();
		if(pausereason){
			this.cases.pausereason = pausereason;
			console.log(this.cases);
//	    this.casesService.update(this.cases);

    $.ajax({
			        type : 'POST',
			        url : "http://mrbs-sit.angelalign.com:1080/opm/service/v4_1/rest.php?method=wechatGetCasePauseReason&input_type=json&response_type=json&rest_data=",
			        data : JSON.stringify(this.cases),
			        dataType:'json',
			        success : function(data){
			            alert(JSON.parse(data));
			        },
			        error:function(a){
			        	console.log(a);
			        }
			       });
	    $(".close").click();
		}else{
			alert("原因不能为空!");
		}
		
  }
	
	endReason(){
		var endreason = $("#endreason").val();
		if(endreason){
			this.cases.endreason = endreason;
		  $.ajax({
			        type : 'POST',
			        url : "http://mrbs-sit.angelalign.com:1080/opm/service/v4_1/rest.php?method=wechatGetCaseEndReason&input_type=json&response_type=json&rest_data=",
			        data : JSON.stringify(this.cases),
			        dataType:'json',
			        success : function(data){
			            alert(JSON.parse(data));
			        },
			        error:function(a){
			        	console.log(a);
			        }
			       });
	    $(".close").click();
		}else{
			alert("原因不能为空!");
		}
	}
	
  goBack(): void {
    this.location.back();
  }
  toadd(cid:any){
  	this.casesid.value.cid = cid;
   	this.router.navigate(['/add',JSON.stringify(this.casesid.value)]);
  }
    get check() {
        return JSON.stringify(this.cases);
    }
 
        

}
