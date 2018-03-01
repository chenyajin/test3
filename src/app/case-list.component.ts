import 'rxjs/add/operator/switchMap';
import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params,Route} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Case } from './case';
import { CasesService } from './cases.service';

@Component({
  selector: 'case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css'],
})
export class CaseListComponent implements OnInit {
  title = '病例列表';
  cases: Case[];
  casesForm:FormGroup;
  casesid:FormGroup;
  constructor(
  	private fb:FormBuilder,
  	 private router: Router,
  	 private route: ActivatedRoute,
  	 private casesService: CasesService) {
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
    this.casesid = this.fb.group({
    	  cid:''
    })
   }
  ngOnInit() {
    this.route.params.subscribe(res =>{
  		this.casesService.findCases(JSON.stringify(res)).then(cases=>this.cases=cases)	})
   
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
   searchCases():void{
           	var name = $('#patient').val();
           	var cid = $('#casesno').val();
           	var cinstitu = $('#institu').val();
           	var cdoctor = $('#doctor').val();
            var ctime = $('#createtime').val();
            var cstate = $('#state').val();
            var ccheck = $('#check').val();
    				this.casesForm.value.name=name;
    				this.casesForm.value.cid=cid;
    				this.casesForm.value.cinstitu=cinstitu;
    				this.casesForm.value.cdoctor=cdoctor;
    				this.casesForm.value.ctime=ctime;
    				this.casesForm.value.cstate=cstate;
    				this.casesForm.value.ccheck=ccheck;
    				console.log(this.casesForm.value);
    				if(name||cid||cstate||cdoctor||ctime||ccheck||cinstitu){
    					this.router.navigate(['/list',JSON.stringify(this.casesForm.value)]);
    				}
           $("#collapseone").collapse('hide');
    				}
   
   goCancel(){
        $("#collapseone").collapse('hide');
   }
   
   todetail(cid:string){
   	this.casesid.value.cid = cid;
   	this.router.navigate(['/detail',JSON.stringify(this.casesid.value)]);
   }
}