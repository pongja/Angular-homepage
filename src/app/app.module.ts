import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CarouselModule} from 'ngx-owl-carousel-o';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IdforgotComponent } from './idforgot/idforgot.component';
import { PasswordforgotComponent } from './passwordforgot/passwordforgot.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { ForgotComponent } from './forgot/forgot.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AuthService } from './auth-service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';






const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    IdforgotComponent,
    PasswordforgotComponent,
    ForgotComponent,
  ],
  imports: [
    BrowserModule,
    NzLayoutModule,
    FormsModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzMenuModule,
    CarouselModule,
    AppRoutingModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzDescriptionsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule,
    NzDropDownModule,
    NzPaginationModule,
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons },{provide:AuthService},],
  bootstrap: [AppComponent],
})

export class AppModule {


}
