import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { tap } from 'rxjs/operators';
import { baseUrl } from "src/environments/environment";
import { Useraccount } from "./Useraccount";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: BehaviorSubject<Useraccount> =
    new BehaviorSubject<Useraccount>(new Useraccount("", "", "", "", "", "")); //useraccount 초기화


  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) {

    this.isLoggedInSubject.next(false);
    this.currentUser = new BehaviorSubject<Useraccount>(new Useraccount("", "", "", "", "", ""));

    const userSession = sessionStorage.getItem("USER"); //할당값

    if (userSession === undefined)
      return;

    let userFromSession: Useraccount = JSON.parse(userSession); //재할당이 필요한 경우 let을 사용하여 userFromSession은 userSession을 담는다

    if (userFromSession !== null && userFromSession !== undefined && userFromSession.id !== "") {
      console.log(userFromSession)//콘솔에 값이 잘들어오는지 확인차 적어둠
      this.currentUser.next(new Useraccount(userFromSession.id, userFromSession.uuid,
        userFromSession.username, userFromSession.name, userFromSession.password, userFromSession.email)); //currentUser에 초기화해준값을 로그인성공시 값이 채워지도록 할당
 
      this.isLoggedInSubject.next(true);
    }
  }


  private handleError(err: HttpErrorResponse) {
    if (err.status === 200) {
      console.error('Error:', err.error.data)
    } else {
      console.error(`Backend error ${err.status}`)
    }
    return throwError('예기치 못한 에러가 발생했습니다. 다시 시도해주세요.')
  }
  
  private handleErrorsingup(err: HttpErrorResponse) {
    if (err.status === 201) {
      console.error('Error:', err.error.data)
    } else {
      alert('회원가입실패');
      console.error(`Backend error ${err.status}`)
    }
    return throwError('예기치 못한 에러가 발생했습니다. 다시 시도해주세요.')
  }


 
  login(username: string, password: string) { //로그인service

    const params = new FormData(); //params 안에 username , password를 저장하여 데이터전송시 username,password가아닌 params로 전달
    params.append('username', username);
    params.append('password', password);
    return this.http.post<any>(`${baseUrl}/signin/`, params, { observe: 'body', withCredentials: true })//withCredentials:true
      .pipe(
        catchError(this.handleError),
        tap(res => {
          let loginUser: any = new Useraccount(res.user.id, res.user.uuid,
            res.user.username, res.user.name, res.user.password, res.user.email);

          this.currentUser.next(loginUser);

          sessionStorage.setItem("USER", JSON.stringify(loginUser));
          this.isLoggedInSubject.next(true);
        }))
  }

  signup(email: string, password: string, name: string) { //회원가입service
    const params = new FormData();
    params.append('email', email);
    params.append('password', password);
    params.append('name', name);
    return this.http.post<any>(`${baseUrl}/signup/`, params, { observe: 'body', withCredentials: true })
      .pipe(
        catchError(this.handleErrorsingup)
      )
  }

  logout() {
    this.currentUser.next(new Useraccount("", "", "", "", "", ""))
    this.isLoggedInSubject.next(false);
    sessionStorage.clear();
    return this.http.post<any>(`${baseUrl}/signout/`, {}); //데이터를 지우기때문에 withCredentials기능자체도 빼며 모든데이터관련 기능은 뺌
  }

  getUseraccount(): Observable<Useraccount> {
    return this.currentUser.asObservable();
  }

}
