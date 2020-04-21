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
  editForm: FormGroup;
  currentUserId: number;
  currentProfileId: number;
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
    this.currentProfileId = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    this.currentProfileId = JSON.parse(localStorage.getItem('currentUser'))['profile_id'];
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
        if (this.inputData.isInputForm) {
          this.inputForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(''),
              this.fb.control('')
            ])
          });
        }
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
        if (this.inputData.isInputForm) {
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
        else {
          const data = this.inputData.data;
          this.editForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(data['company_name']),
              this.fb.control(data['start_date']),
              this.fb.control(data['end_date']),
              this.fb.control(data['title']),
              this.fb.control(data['responsibilities']),
            ])
          })
        }
      }
        break;
      case 'Projects': {
        this.labels = ['Name of the project', 'Start date', 'End date', 'Description', 'Link to project'];
        this.placeholders = ['', 'YYYY-MM-DD', 'YYYY-MM-DD', '', '']
        if (this.inputData.isInputForm) {
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
        else {
          const data = this.inputData.data;
          this.editForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(data['project_name']),
              this.fb.control(data['start_date']),
              this.fb.control(data['end_date']),
              this.fb.control(data['description']),
              this.fb.control(data['link']),
            ])
          })
        }
      }
        break;
      case 'Certifications': {
        this.labels = ['Certification'];
        this.placeholders = ['Certification Name', 'Validity in YYYY-MM-DD', 'Description'];
        if (this.inputData.isInputForm) {
          this.inputForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(''),
              this.fb.control(''),
              this.fb.control('')
            ])
          });
        }
        else {
          const data = this.inputData.data;
          this.editForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(data['certification_name']),
              this.fb.control(data['validity_date']),
              this.fb.control(data['description'])
            ])
          })
        }
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
          this.currentProfileId,
          {
            first_name: this.inputForm.get('profile').value[0],
            last_name: this.inputForm.get('profile').value[1]
          })
          .subscribe(_ => {
            this.myProfileService.updateUserDetails();
            this.closeInputModal();
          })
      }
        break;
      case 'Headline': {
        this.authService.update_user_details(this.currentProfileId, { brief_Desc: this.inputForm.get('profile').value[0] })
          .subscribe(_ => {
            this.myProfileService.updateUserDetails();
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
          user: this.currentProfileId,
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
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
          user: this.currentProfileId,
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
          this.closeInputModal();
        })
        break;
      }
      case 'Certifications': {
        this.authService.add_certificate({
          certification_name: this.inputForm.get('profile').value[0],
          validity_date: this.inputForm.get('profile').value[1],
          description: this.inputForm.get('profile').value[2],
          user: this.currentProfileId
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
          this.closeInputModal();
        })
        break;
      }
      case 'Skills': {
        this.authService.add_skill({
          skill: this.inputForm.get('profile').value[0],
          level: this.inputForm.get('profile').value[1],
          user: this.currentProfileId
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
          this.closeInputModal();
        })
        break;
      }
    }
  }

  onEdit(description) {
    switch (description) {
      case 'Certifications': {
        this.authService.update_certificate(this.inputData.data.id, {
          certification_name: this.editForm.get('profile').value[0],
          validity_date: this.editForm.get('profile').value[1],
          description: this.editForm.get('profile').value[2],
          user: this.currentProfileId
        })
          .subscribe(_ => {
            this.myProfileService.updateUserDetails();
            this.closeInputModal();
          })
        break;
      }
      case 'Experience': {
        this.authService.update_experience(this.inputData.data.id, {
          company_name: this.editForm.get('profile').value[0],
          start_date: this.editForm.get('profile').value[1],
          end_date: this.editForm.get('profile').value[2],
          title: this.editForm.get('profile').value[3],
          responsibilities: this.editForm.get('profile').value[4],
          user: this.currentProfileId
        })
          .subscribe(_ => {
            this.myProfileService.updateUserDetails();
            this.closeInputModal();
          })
        break;
      }
      case 'Projects': {
        this.authService.update_project(this.inputData.data.id, {
          project_name: this.editForm.get('profile').value[0],
          start_date: this.editForm.get('profile').value[1],
          end_date: this.editForm.get('profile').value[2],
          description: this.editForm.get('profile').value[3],
          link: this.editForm.get('profile').value[4],
          user: this.currentProfileId,
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
          this.closeInputModal();
        })
        break;
      }
    }

  }

  onDelete(description) {
    switch (description) {
      case 'Certifications': {
        this.authService.delete_certificate(this.inputData.data.id)
          .subscribe(_ => {
            this.myProfileService.updateUserDetails();
            this.closeInputModal();
          })
        break;
      }
      case 'Experience': {
        this.authService.delete_experience(this.inputData.data.id)
          .subscribe(_ => {
            this.myProfileService.updateUserDetails();
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
