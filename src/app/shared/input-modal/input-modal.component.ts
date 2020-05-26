import { Component, OnInit, Input } from '@angular/core';
import { MyprofileEditableService } from 'src/app/professional-networking/my-profile-editable/myprofile-editable.service';
import { MyProfile } from 'src/app/professional-networking/my-profile-editable/myprofle';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';

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
    private authService: AuthServices
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
        this.labels = ['Enter your first name', 'Enter your last name', 'Enter your location', 'Enter your profession'];
        this.placeholders = ['first name', 'last name', '', '']
        if (this.inputData.isInputForm) {
          this.inputForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(''),
              this.fb.control(''),
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
        this.labels = ['Name of the organization', 'Start date', 'End date', 'Is Present', 'Name of Role', 'Job Responibilities'];
        this.placeholders = ['', 'YYYY-MM-DD', 'YYYY-MM-DD', '(True/False)', '', '']
        if (this.inputData.isInputForm) {
          this.inputForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(''),
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
      } ``
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
        this.placeholders = ['Certification Name', 'Issue date in YYYY-MM-DD', 'Expiration date in YYYY-MM-DD', 'This credential does not expire (True/False)', 'Description'];
        if (this.inputData.isInputForm) {
          this.inputForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(''),
              this.fb.control(''),
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
              this.fb.control(data['issue_date']),
              this.fb.control(data['expiration_date']),
              this.fb.control(data['not_expire']),
              this.fb.control(data['description']),
            ])
          })
        }
        break;
      }
      case 'Education': {
        this.labels = ['Education'];
        this.placeholders = ['Institute', 'Degree', 'Study Field', 'Start Year (e.g. - 2015)', 'End Year (e.g. - 2020)', 'Is Present (True/False)', 'Grade (In Numbers)', 'Description', 'Link'];
        if (this.inputData.isInputForm) {
          this.inputForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(''),
              this.fb.control(''),
              this.fb.control(''),
              this.fb.control(''),
              this.fb.control(''),
              this.fb.control(''),
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
              this.fb.control(data['institute']),
              this.fb.control(data['degree']),
              this.fb.control(data['study_field']),
              this.fb.control(data['start_year']),
              this.fb.control(data['end_year']),
              this.fb.control(data['is_present']),
              this.fb.control(data['grade']),
              this.fb.control(data['desc']),
              this.fb.control(data['link']),
            ])
          })
        }
        break;
      }
      case 'Skills': {
        this.labels = ['Skill', 'Level']
        this.placeholders = ['Enter skill name', 'Enter skill level (1-10)']
        if (this.inputData.isInputForm) {
          this.inputForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(''),
              this.fb.control('')
            ])
          });
        }
        else {
          const data = this.inputData.data;
          this.editForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(data['skill']),
              this.fb.control(data['level']),
            ])
          })
        }

      }
        break;
      case 'Language': {
        this.labels = ['Language', 'Proficiency']
        this.placeholders = ['Enter language name', 'Enter proficiency level (1-10)']
        if (this.inputData.isInputForm) {
          this.inputForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(''),
              this.fb.control('')
            ])
          });
        }
        else {
          const data = this.inputData.data;
          this.editForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(data['language']),
              this.fb.control(data['proficiency']),
            ])
          })
        }

      }
        break;
      case 'Hobby': {
        this.labels = ['Title', 'Description']
        this.placeholders = ['Enter Hobby Title', 'Description of Hobby']
        if (this.inputData.isInputForm) {
          this.inputForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(''),
              this.fb.control('')
            ])
          });
        }
        else {
          const data = this.inputData.data;
          this.editForm = this.fb.group({
            profile: this.fb.array([
              this.fb.control(data['title']),
              this.fb.control(data['desc']),
            ])
          })
        }

      }
        break;
      case 'Award': {
        this.labels = ['Title', 'Issued by', 'Issue date', 'Descripion']
        this.placeholders = ['Enter Award Title', 'Issued by', 'Enter date in YYYY-MM (e.g., 2020-04)', 'Description']
        if (this.inputData.isInputForm) {
          this.inputForm = this.fb.group({
            profile: this.fb.array([
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
              this.fb.control(data['title']),
              this.fb.control(data['issuer']),
              this.fb.control(data['issue_time']),
              this.fb.control(data['desc']),

            ])
          })
        }

      }
        break;
    }
  }

  onSave(description) {
    switch (description) {
      case 'Profile': {
        let updateObj = {};

        if (!!this.inputForm.get('profile').value[0]) updateObj['first_name'] = this.inputForm.get('profile').value[0];
        if (!!this.inputForm.get('profile').value[1]) updateObj['last_name'] = this.inputForm.get('profile').value[1];
        if (!!this.inputForm.get('profile').value[2]) updateObj['location'] = this.inputForm.get('profile').value[2];
        if (!!this.inputForm.get('profile').value[3]) updateObj['profession'] = this.inputForm.get('profile').value[3];

        this.authService.update_user_details(
          this.currentProfileId, updateObj)
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
          is_present: this.inputForm.get('profile').value[3],
          title: this.inputForm.get('profile').value[4],
          responsibilities: this.inputForm.get('profile').value[5],
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
          issue_date: this.inputForm.get('profile').value[1],
          expiration_date: this.inputForm.get('profile').value[2],
          not_expire: this.inputForm.get('profile').value[3],
          description: this.inputForm.get('profile').value[4],
          user: this.currentProfileId
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
          this.closeInputModal();
        })
        break;
      }
      case 'Language': {
        this.authService.add_language({
          language: this.inputForm.get('profile').value[0],
          proficiency: this.inputForm.get('profile').value[1],
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
      case 'Education': {
        this.authService.add_education({
          institute: this.inputForm.get('profile').value[0],
          degree: this.inputForm.get('profile').value[1],
          study_field: this.inputForm.get('profile').value[2],
          start_year: this.inputForm.get('profile').value[3],
          end_year: this.inputForm.get('profile').value[4],
          is_present: this.inputForm.get('profile').value[5],
          grade: this.inputForm.get('profile').value[6],
          desc: this.inputForm.get('profile').value[7],
          link: this.inputForm.get('profile').value[8],

          user: this.currentProfileId
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
          this.closeInputModal();
        })
        break;
      }
      case 'Hobby': {
        this.authService.add_hobby({
          title: this.inputForm.get('profile').value[0],
          desc: this.inputForm.get('profile').value[1],
          user: this.currentProfileId
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
          this.closeInputModal();
        })
        break;
      }
      case 'Award': {
        this.authService.add_award({
          title: this.inputForm.get('profile').value[0],
          issuer: this.inputForm.get('profile').value[1],
          issue_time: this.inputForm.get('profile').value[2],
          desc: this.inputForm.get('profile').value[3],
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
          certification_name: this.inputForm.get('profile').value[0],
          issue_date: this.inputForm.get('profile').value[1],
          expiration_date: this.inputForm.get('profile').value[2],
          not_expire: this.inputForm.get('profile').value[3],
          description: this.inputForm.get('profile').value[4],
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
      case 'Skills': {
        this.authService.update_skill(this.inputData.data.id, {
          skill: this.editForm.get('profile').value[0],
          level: this.editForm.get('profile').value[1],
          user: this.currentProfileId,
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
          this.closeInputModal();
        })
        break;
      }
      case 'Language': {
        this.authService.update_language(this.inputData.data.id, {
          language: this.editForm.get('profile').value[0],
          proficiency: this.editForm.get('profile').value[1],
          user: this.currentProfileId,
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
          this.closeInputModal();
        })
        break;
      }
      case 'Education': {
        this.authService.update_education(this.inputData.data.id, {
          institute: this.editForm.get('profile').value[0],
          degree: this.editForm.get('profile').value[1],
          study_field: this.editForm.get('profile').value[2],
          start_year: this.editForm.get('profile').value[3],
          end_year: this.editForm.get('profile').value[4],
          is_present: this.editForm.get('profile').value[5],
          grade: this.editForm.get('profile').value[6],
          desc: this.editForm.get('profile').value[7],
          link: this.editForm.get('profile').value[8],
          user: this.currentProfileId,
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
          this.closeInputModal();
        })
        break;
      }
      case 'Hobby': {
        this.authService.update_hobby(this.inputData.data.id, {
          title: this.editForm.get('profile').value[0],
          desc: this.editForm.get('profile').value[1],
          user: this.currentProfileId,
        }).subscribe(_ => {
          this.myProfileService.updateUserDetails();
          this.closeInputModal();
        })
        break;
      }
      case 'Award': {
        this.authService.update_award(this.inputData.data.id, {
          title: this.editForm.get('profile').value[0],
          issuer: this.editForm.get('profile').value[1],
          issue_time: this.editForm.get('profile').value[2],
          desc: this.editForm.get('profile').value[3],
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
    if (confirm('Do you want to delete?')) {
      switch (description) {
        case 'Education': {
          this.authService.delete_education(this.inputData.data.id)
            .subscribe(_ => {
              this.myProfileService.updateUserDetails();
              this.closeInputModal();
            })
          break;
        }
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
        case 'Skills': {
          this.authService.delete_skills(this.inputData.data.id)
            .subscribe(_ => {
              this.myProfileService.updateUserDetails();
              this.closeInputModal();
            })
          break;
        }
        case 'Award': {
          this.authService.delete_awards(this.inputData.data.id)
            .subscribe(_ => {
              this.myProfileService.updateUserDetails();
              this.closeInputModal();
            })
          break;
        }
        case 'Hobby': {
          this.authService.delete_hobby(this.inputData.data.id)
            .subscribe(_ => {
              this.myProfileService.updateUserDetails();
              this.closeInputModal();
            })
          break;
        }
        case 'Language': {
          this.authService.delete_languages(this.inputData.data.id)
            .subscribe(_ => {
              this.myProfileService.updateUserDetails();
              this.closeInputModal();
            })
          break;
        }
      }
    }

  }

  closeInputModal() {
    this.myProfileService.closeModal();
  }


}
