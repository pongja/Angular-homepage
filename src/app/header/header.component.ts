import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth-service';
import { Useraccount } from '../Useraccount';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush //화면변경을 감지하고 값을동기화하여 html에 업데이트할수있도록 도와주는기능
})
export class HeaderComponent implements OnInit {

  user: Useraccount = new Useraccount("", "", "", "", "", "");


  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  username$: Observable<string> = this.usernameSubject.asObservable();

  private loginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  login$: Observable<boolean> = this.loginSubject.asObservable();

  constructor(private authservice: AuthService, private router: Router) { 
    
  }

  ngOnInit(): void {
 
    this.loginSubject.next(false); //기본 false

    this.authservice.isLoggedIn.subscribe((status: any) => {
      console.log(status);

      if (status === true) { //스테이스터스가 참일때 로그인 으로넘어감
        this.loginSubject.next(true);
      } else {
        this.checkLogin(); //로그인에 대한 유효성검사식 else일시 checkLogin을 참고하라
      }
    });


  }

  checkLogin() {
    this.authservice.getUseraccount().subscribe(userRes => {
      if (userRes !== null && userRes !== undefined && userRes.id !== "") { //세션에 온 사용자에대한 유효성검사 검사추가 데이터 저장 오브젝트가 빈값 "" 으로 잡혀있기때문에 null 과 undefined 와 비교를해서 값이 맞다면 true 아니라면 false
        console.log(userRes);
        this.loginSubject.next(true);
        this.usernameSubject.next(userRes.username);
        this.user =
          new Useraccount(userRes.id, userRes.uuid, userRes.username, userRes.email, userRes.password, userRes.name); //사용자데이터

      } else {
        this.loginSubject.next(false); //아닐경우 로그인이 성공되어 메인화면으로 넘어가는것을 막습니다 
        console.log(this.user);
      }
    })
  }

  logout($event: any) {
    $event.stopPropagation(); //부모태그로의 이벤트 멈추기
    this.loginSubject.next(false);
    this.user = new Useraccount("", "", "", "", "", "");
    this.authservice.logout();
    this.router.navigate(['/']) //삭제하고 라우터 dashboard navi이동

  }
}
