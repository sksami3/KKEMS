import { EventEmitter } from "@angular/core";

export class ModalPopupService {
  closeEvent: EventEmitter<any> = new EventEmitter();
  constructor() {}
  emit(data : any) {
    this.closeEvent.emit(data);
  }
  getCloseEvent() {
    return this.closeEvent;
  }
}