import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../_services/doctor.service';
import { StorageService } from '../_services/storage.service';
interface UpdateProfileResponse {
  success: boolean;
  message: string;
}
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})

export class PatientProfileComponent implements OnInit{
  patient: any = {}; 
  updateMessage: string = '';
    constructor(private doctorService:DoctorService,private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.doctorService.getDataForUser(this.storageService.getUser().username).subscribe(
      (data:any) => {
        this.patient = data;
      }
    )
  }

  updateProfile() {
    this.patient.username = this.storageService.getUser().username;
    this.doctorService.addInformation(this.patient).subscribe(
      () => {
        this.updateMessage = 'Profile updated successfully!';
      },
      (error) => {
        this.updateMessage = 'Error updating profile. Please try again.';
        console.error('Error updating profile:', error);
      }
    );
  }
  
  
}
