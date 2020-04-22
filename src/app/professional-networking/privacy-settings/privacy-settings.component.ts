import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.component.html',
  styleUrls: ['./privacy-settings.component.css']
})
export class PrivacySettingsComponent implements OnInit {

  userId: number; //remove this
  userDetails: any = {};
  name: any = [];
  privacy_menu = ['Location', 'Headline', 'Experience', 'Projects', 'Project Descriptions', 'Certificates', 'Skills', 'Resume'];
  selected_menu: any = [];
  menuValidation: Boolean = false;
  received_data: any = [];
  menuObj: any = {};
  constructor(
    private authService: AuthService, private router: Router, private notifyService: NotificationService
  ) {
    this.getUserDetails();
  }

  ngOnInit() {
  }
  checkifmatchmenu(itm) {
    var obj = {};
    if (this.selected_menu)
      if (!this.selected_menu.some((item) => item.id == itm)) {
        // console.log(item.id,this.received_data.menuInfo[0].menuId)
        return false;
      }
      else {
        for (let array of this.selected_menu) {
          if (itm == array.id)
            return true;
        }
        // this.selected_menu.push(itm);
        return true;
      }
  }


  getUserDetails() {
    this.userId = ((JSON.parse(localStorage.getItem('currentUser')).profile_id));
    //console.log(this.userId);
    this.authService.get_user_details(this.userId)
      .subscribe(respObj => {
        this.userDetails = { ...respObj };

      })
    // this.authService.get_user_profiles().subscribe((data:any)=>{
    // console.log(data);
    // })
    this.authService.get_privacy_details()
      .subscribe((respObj: any) => {
        this.received_data = respObj[0];
        console.log(this.received_data);
        //  for(let i = 0;i<this.received_data.length;i++)
        //  {
        //    if(this.received_data[i]=='location'||this.received_data[i]=='headline'||this.received_data[i]=='experience'||this.received_data[i]=='projects'||this.received_data[i]=='project_desc'||this.received_data[i]=='certificates'||this.received_data[i]=='skills'||this.received_data[i]=='resume')
        //    {

        //    }
        //  }
        if (this.received_data.location == true)
          this.selected_menu.push({ id: 0 });
        if (this.received_data.headline == true)
          this.selected_menu.push({ id: 1 });
        if (this.received_data.experience == true)
          this.selected_menu.push({ id: 2 });
        if (this.received_data.projects == true)
          this.selected_menu.push({ id: 3 });
        if (this.received_data.project_desc == true)
          this.selected_menu.push({ id: 4 });
        if (this.received_data.certificates == true)
          this.selected_menu.push({ id: 5 });
        if (this.received_data.skills == true)
          this.selected_menu.push({ id: 6 })
        if (this.received_data.resume == true)
          this.selected_menu.push({ id: 7 })
        console.log(this.selected_menu)
      })
  }
  getmenuCheckboxValues(ev, item) {

    let obj = {
      id: item
    };

    //  console.log(obj)

    if (ev.target.checked) {
      //  console.log("checked")
      this.selected_menu.push(obj);
      if (this.selected_menu.length == 0)
        this.menuValidation = true;
      if (this.selected_menu.length != 0)
        this.menuValidation = false;
      // if (this.selected_menu.length != 0) this.specialityvalidation = false;
      // console.log(obj);
    } else {
      //  console.log("unchecked")
      // if (sessionStorage.getItem('editDetailsid')) {
      //   console.log(this.received_data.notaryspecailityinfo)
      //   let removeIndex1 = this.received_data.notaryspecailityinfo.findIndex(itm => itm.notarySpecialityId === data.id);
      //   this.received_data.notaryspecailityinfo.splice(removeIndex1, 1)
      //   console.log(removeIndex1)
      // }
      let removeIndex = this.selected_menu.findIndex(itm => itm.id === item);
      console.log(removeIndex)
      if (removeIndex !== -1) {
        this.selected_menu.splice(removeIndex, 1);

        //  console.log("removed")
      }
      if (this.selected_menu.length == 0)
        this.menuValidation = true;
      if (this.selected_menu.length != 0)
        this.menuValidation = false;
    }


    console.log(this.selected_menu);

    //  privacy_menu = ['Location','Headline','Experience','Projects','Project Descriptions','Certificates','Skills','Resume'];

  }
  showToasterSuccess() {
    this.notifyService.showSuccess("Successful", "Privacy settings changed !")
  }
  submit() {
    console.log(this.selected_menu)
    this.menuObj = {};
    this.name = [];
    for (let i = 0; i < this.selected_menu.length; i++) {
      if (this.selected_menu[i].id == 0)
        this.name.push('location');
      if (this.selected_menu[i].id == 1)
        this.name.push('headline');
      if (this.selected_menu[i].id == 2)
        this.name.push('experience');
      if (this.selected_menu[i].id == 3)
        this.name.push('projects');
      if (this.selected_menu[i].id == 4)
        this.name.push('project_desc');
      if (this.selected_menu[i].id == 5)
        this.name.push('certificates');
      if (this.selected_menu[i].id == 6)
        this.name.push('skills');
      if (this.selected_menu[i].id == 7)
        this.name.push('resume');
      // let obj:any={};

    }
    this.menuObj.name = this.name;


    this.authService.edit_privacy_details(this.menuObj).subscribe((data: any) => {
      this.showToasterSuccess()
      this.router.navigateByUrl('/professional-networking/me')
    })
  }

}
