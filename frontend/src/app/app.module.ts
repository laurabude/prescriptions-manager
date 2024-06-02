import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SettingsComponent } from './settings/settings.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DoctorInterfaceComponent } from './doctor-interface/doctor-interface.component';
import { DoctorService } from './_services/doctor.service';
import { CalendarService } from './_services/calendar.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { MatTableModule } from '@angular/material/table';
import { DoctorPatientsListComponent } from './doctor-patients-list/doctor-patients-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    HomePageComponent,
    BoardAdminComponent,
    BoardUserComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    SettingsComponent,
    CalendarComponent,
    PrescriptionComponent,
    DoctorInterfaceComponent,
    PatientProfileComponent,
    DoctorPatientsListComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),

  ],
  providers: [httpInterceptorProviders,DoctorService,CalendarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
