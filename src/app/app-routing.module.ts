import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { IdforgotComponent } from "./idforgot/idforgot.component";
import { LoginComponent } from "./login/login.component";
import { PasswordforgotComponent } from "./passwordforgot/passwordforgot.component";
import { SignupComponent } from "./signup/signup.component";

/**
 * 기   능: 페이지의 연결 및 이동을 위한 라우터기능입니다.
 * 주의사항: PATH경로 를 틀렸을경우 해당부분 누를시 원활한 작동을 하지않습니다.
 */
const appRoutes: Routes=[
  { path: '',redirectTo: '/dashboard', pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'forgot', component: ForgotComponent},
  { path: 'singup', component: SignupComponent},
  { path: 'idforgot', component: IdforgotComponent},
  { path: 'passwordforgot', component:PasswordforgotComponent},
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{enableTracing:false,useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule {


}
