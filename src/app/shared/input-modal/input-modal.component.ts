import { Component, OnInit, Input } from '@angular/core';
import { MyprofileEditableService } from 'src/app/professional-networking/my-profile-editable/myprofile-editable.service';
import { MyProfile } from 'src/app/professional-networking/my-profile-editable/myprofle';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css']
})
export class InputModalComponent implements OnInit {

  inputForm: FormGroup;
  currentUserId: number;
  inputData: MyProfile
  labels: string[];
  placeholders: string[];

  constructor(
    private myProfileService: MyprofileEditableService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    this.myProfileService.inputModal$.subscribe(inputData => {
      this.inputData = { ...inputData };
      this.createDynamicFormControls()
    })
  }

  createDynamicFormControls() {
    switch (this.inputData.description) {
      case 'Profile': {
        this.labels = ['Enter your first name', 'Enter your last name'];
        this.placeholders = ['first name', 'last name']
        console.log(this.labels);
        this.inputForm = this.fb.group({
          profile: this.fb.array([
            this.fb.control(''),
            this.fb.control('')
          ])
        });
        break;
      }
      case 'Headline': {
        this.labels = ['Headline']
        this.placeholders = ['headline']
        this.inputForm = this.fb.group({
          profile: this.fb.array([
            this.fb.control('')
          ])
        });
      }
        break;
      case 'Experience': {
        this.labels = ['Name of the company/corporation', 'Start date', 'End date', 'Name of Role', 'Job Responibilities'];
        this.placeholders = ['', 'YYYY-MM-DD', 'YYYY-MM-DD', '', '']
        this.inputForm = this.fb.group({
          profile: this.fb.array([
            this.fb.control(''),
            this.fb.control(''),
            this.fb.control(''),
            this.fb.control(''),
            this.fb.control(''),
          ])
        });
      }
        break;
      case 'Projects': {
        this.labels = ['Name of the project', 'Start date', 'End date', 'Description', 'Link to project'];
        this.placeholders = ['', 'YYYY-MM-DD', 'YYYY-MM-DD', '', '']
        this.inputForm = this.fb.group({
          profile: this.fb.array([
            this.fb.control(''),
            this.fb.control(''),
            this.fb.control(''),
            this.fb.control(''),
            this.fb.control(''),
          ])
        });
      }
        break;
      case 'Certifications': {
        this.labels = ['Certification'];
        this.placeholders = ['Certification Name', 'Validity in YYYY-MM-DD','Description'];
        this.inputForm = this.fb.group({
          profile: this.fb.array([
            this.fb.control(''),
            this.fb.control(''),
            this.fb.control('')
          ])
        });
        break;
      }
      case 'Skills': {
        this.labels = ['Skill', 'Level']
        this.placeholders = ['Enter skill name', 'Enter skill level (1-10)']
        this.inputForm = this.fb.group({
          profile: this.fb.array([
            this.fb.control(''),
            this.fb.control('')
          ])
        });
      }
        break;
    }
  }

  onSave(description) {
    switch (description) {
      case 'Profile': {
        this.authService.update_user_details(
          this.currentUserId,
          {
            first_name: this.inputForm.get('profile').value[0],
            last_name: this.inputForm.get('profile').value[1]
          })
          .subscribe(_ => {
            this.closeInputModal();
          })
      }
        break;
      case 'Headline': {
        this.authService.update_user_details(this.currentUserId, { brief_Desc: this.inputForm.get('profile').value[0] })
          .subscribe(_ => {
            this.closeInputModal();
          })
      }
        break;

      case 'Experience': {
        this.authService.add_experience({
          company_name: this.inputForm.get('profile').value[0],
          start_date: this.inputForm.get('profile').value[1],
          end_date: this.inputForm.get('profile').value[2],
          title: this.inputForm.get('profile').value[3],
          responsibilities: this.inputForm.get('profile').value[4],
          user: this.currentUserId,
        }).subscribe(_ => {
          this.closeInputModal();
        })
        break;
      }
      case 'Projects': {
        this.authService.add_project({
          project_name: this.inputForm.get('profile').value[0],
          start_date: this.inputForm.get('profile').value[1],
          end_date: this.inputForm.get('profile').value[2],
          description: this.inputForm.get('profile').value[3],
          link: this.inputForm.get('profile').value[4],
          user: this.currentUserId,
        }).subscribe(_ => {
          this.closeInputModal();
        })
        break;
      }
      case 'Certifications': {
        this.authService.add_certificate({
          certification_name: this.inputForm.get('profile').value[0],
          validity_date: this.inputForm.get('profile').value[1],
          description: this.inputForm.get('profile').value[2],
          user: this.currentUserId
        }).subscribe(_ => {
          this.closeInputModal();
        })
        break;
      }
      case 'Skills': {
        this.authService.add_skill({
          skill: this.inputForm.get('profile').value[0],
          level: this.inputForm.get('profile').value[1],
          user: this.currentUserId
        }).subscribe(_ => {
          this.closeInputModal();
        })
        break;
      }
    }
  }

  closeInputModal() {
    this.myProfileService.closeModal();
  }

}
