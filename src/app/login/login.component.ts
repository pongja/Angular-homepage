
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth-service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordVisible = false; //password 입력시 숨김처리를 위한 기능.
  validateForm!: FormGroup;
  logoimageUrl = "assets/images/MyBlog2.png";


  onSubmit(): void {
 
    if (this.validateForm.value) {
      this.authservice.login(this.validateForm.value.username, this.validateForm.value.password)
        .pipe(first())
        .subscribe({ //subcribe 구독행위로써 next 와 error로 성공실패에대한 유무
          next: () => {
            alert('로그인성공');
            this.router.navigate(['/dashboard'])
          },
          error: error => {
            console.log(error)
            alert('로그인실패\n' + 'ID와 PASSWORD를 확인해주세요');
          }
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => { //폼 유효성 에서 ID,PASSWORD 다음에 기억할것인지에대한 체크효과에대한 설정
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });

        }

      });
    }

  }

  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router) { //폼빌더주입


  }

  get username() {

    return this.validateForm.get('username');

  }

  get password() {

    return this.validateForm.get('password');

  }


  ngOnInit(): void {
    this.validateForm = this.fb.group({ //데이터
      username: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
      remember: [true]
    })
  }
}
