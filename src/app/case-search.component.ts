import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Location }               from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Headers,Http } from '@angular/http';
import { Case } from './case';
import { CasesService } from './cases.service';

@Component({
  selector: 'case-search',
  templateUrl: './case-search.component.html',
  styleUrls: ['./case-search.component.css'],
})
export class CaseSearchComponent implements OnInit{
	casesForm:FormGroup;
	 private headers = new Headers({'Content-Type': 'application/json'});
	 data:'';
  constructor(
  	private http:Http,
  	private fb:FormBuilder,
		private casesService: CasesService,
		private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
    	this.creatForm();
    }
    
    creatForm(){
    	this.casesForm = this.fb.group({
    		cinstitu:'',
    		cdoctor:'',
    		name:'',
    		cid:'',
    		cstate:'',
    		ccheck:'',
    		ctime:''
    	});
    }
    ngOnInit():void{
    	$("input.desstate").on('click',function(){
      	var selectvalue = $(this).val();
	        $("#state").val(selectvalue);
	          document.getElementById("button1").click();
         	 });
      	$("input.descheck").on('click',function(){
      	var selectvalue = $(this).val();
	        $("#check").val(selectvalue);
	          document.getElementById("button2").click();
         });
    }
    
    searchcases():void{
             var time = $('#appDateTime1').val();
             var state = $('#state').val();
             var check = $('#check').val();
    				this.casesForm.value.ctime=time;
    				this.casesForm.value.cstate=state;
    				this.casesForm.value.ccheck=check;
    				console.log(this.casesForm.value);
    				 this.router.navigate(['/list',this.casesForm.value]);
//        $(function selected(callback){
//        	$.ajax({
//					        type : 'POST',
//					        url : "http://opm.shidaits.com/qywx/index.php/Home/service/searchCases",
//					        data :JSON.stringify(this.casesForm.value),
//					        dataType:'json',
//					        success : function(data){
//					            console.log(data[0]);
//					            callback(data[0]);
//					           },
//					        error:function(a){
//					        	console.log(a);
//					        }
//					      });
//        });
    				
    }
    
  goBack(): void {
    this.location.back();

  }
}
