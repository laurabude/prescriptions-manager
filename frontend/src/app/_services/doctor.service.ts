import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
;import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', 
  })
export class DoctorService {
  private backendUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient,private userService: UserService) {}

  getPatients() {
    return this.http.get(`${this.backendUrl}/users/getUsers`);
  }

  getDataForUser(username:string) {
    return this.http.post(`${this.backendUrl}/users/getDataForUser`,{username:username});
  }

  addInformation(form: any): Observable<any> {
    return this.http.put(
      this.backendUrl + '/users/addInformation',
      form
    );
  }

  setPrescription(prescriptionData: any) {
    return this.http.post(`${this.backendUrl}/medication/prescribe`,prescriptionData);
  }

  deletePrescription(id: any) {
    return this.http.post(`${this.backendUrl}/medication/deletePrescription`,{id:id});
  }

  getMedicationForUser(user: string) {
    return this.http.post(`${this.backendUrl}/medication/getMedicationForUser`,{user:user});
  }

  getPrescriptions(){
    return this.http.get(`${this.backendUrl}/medication/getAllPrescriptions`);
  }
}
