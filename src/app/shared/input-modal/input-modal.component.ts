import { Component, OnInit, Input } from '@angular/core';
import { MyprofileEditableService } from 'src/app/professional-networking/my-profile-editable/myprofile-editable.service';
import { MyProfile } from 'src/app/professional-networking/my-profile-editable/myprofle';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css']
})
export class InputModalComponent implements OnInit {

  inputForm: FormGroup;

  inputData: MyProfile

  constructor(
    private myProfileService: MyprofileEditableService,
    private fb: FormBuilder,

  ) {
    
  }

  ngOnInit() {
    this.inputForm = this.fb.group({
      profile: this.fb.array([
        this.fb.control('')
      ])
    });
    this.myProfileService.inputModal$.subscribe(inputData => {
      this.inputData = { ...inputData };
      this.createDynamicFormControls()
    })
  }

  createDynamicFormControls() {
    switch (this.inputData.description) {
      case 'headline': {
        // this.inputForm = this.fb.group({
        //   profile: this.fb.array([
        //     this.fb.control('')
        //   ])
        // });
        break;
      }
    }
  }

  closeInputModal() {
    this.myProfileService.closeModal();
  }

}
