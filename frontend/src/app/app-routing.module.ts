import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DoctorInterfaceComponent } from './doctor-interface/doctor-interface.component';
import { DoctorPatientsListComponent } from './doctor-patients-list/doctor-patients-list.component';
import { LoginComponent } from './login/login.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'doctor', component: DoctorInterfaceComponent },
  { path: 'patient-profile', component: PatientProfileComponent },
  { path: 'patients-info', component: DoctorPatientsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
