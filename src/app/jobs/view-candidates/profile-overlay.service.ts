import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface profileOverlay {
  toShow: boolean,
  userId: number
}

@Injectable({
  providedIn: 'root'
})
export class ProfileOverlayService {

  private profileOverlay = new BehaviorSubject<profileOverlay>({
    userId: null,
    toShow: false
  });
  public profileOverlay$ = this.profileOverlay.asObservable();

  constructor() { }

  openProfileOverlay(userId: number) {
    this.profileOverlay.next({
      toShow: true,
      userId: userId
    });
  }

  closeProfileOverlay() {
    this.profileOverlay.next({
      toShow: false,
      userId: null
    })
  }

}
