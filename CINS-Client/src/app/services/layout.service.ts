import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
  footerButtonsActive: Array<boolean>;
  onlySearchBarResult: boolean;

  constructor() {
    this.footerButtonsActive                      = [];
    this.footerButtonsActive['startMenuActive']   = false;
    this.footerButtonsActive['searchMenuActive']  = false;
    this.footerButtonsActive['addMediaModal']     = false;
    this.onlySearchBarResult                      = false;

  }
  toggleFooterButtonsActive(footerButton) {
    if(this.footerButtonsActive[footerButton]) {
      this.footerButtonsActive[footerButton]  = false;
      return;
    }

    for(let button in this.footerButtonsActive) {
      this.footerButtonsActive[button]  = false
    }

    this.footerButtonsActive[footerButton]  = true;
  }

  hideFooterButtonsActive() {
    for(let button in this.footerButtonsActive) {
      this.footerButtonsActive[button]  = false
    }
  }


}
