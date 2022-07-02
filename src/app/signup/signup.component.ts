import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AuthService } from '../auth-service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  validateForm!: FormGroup;
  logoimageUrl = "assets/images/MyBlog2.png"
  passwordVisible = false; //비밀번호 숨기기
  confirmwordVisible = false; //비밀번호 재확인에대한 숨기기기능
  confirm?:string; //비밀번호 재확인 기능

  submitForm(): void { //가입하기 버튼< //가입하기 누르고 이동 로그인 <
    if(this.validateForm.value){
    this.authservice.signup(this.validateForm.value.email,this.validateForm.value.password,this.validateForm.value.name)
    .subscribe((res:any)=>{
     if(res.status === 201){ //status 201로 연결이 되었을시 submit되는동시에 login 페이지로 넘어갑니다.
       alert('회원가입성공');
       console.log('submit');
       this.router.navigate(['/login']);
     }
    })
  }
}

  resetForm(e: MouseEvent): void {
    e.preventDefault(); //e.preventDefault() 메서드는 어떤 이벤트를 명시적으로 처리하지 않은 경우, 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 지정합니다.
    this.validateForm.reset(); 
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls['confirm'].updateValueAndValidity()//패스워드에대한 코드 중복확인
    );
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // 오류 이벤트로 표시하려면 `(error: true)`를 반환해야합니다.
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) { 
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: FormBuilder, private authservice:AuthService, private router:Router) {

  }

  get email(){
    return this.validateForm.get('email');
  }
  get name() {

    return this.validateForm.get('name');

  }
  get password() {

    return this.validateForm.get('password');

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      date: [null],
    });
  }
}

