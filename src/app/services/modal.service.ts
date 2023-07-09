import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  addProjectModal = new BehaviorSubject<boolean>(false);
  loginModal = new BehaviorSubject<boolean>(false);
  registerModal = new BehaviorSubject<boolean>(false);
  addGraphicModal = new BehaviorSubject<boolean>(false);
  confirmDeleteModal = new BehaviorSubject<boolean>(false);
  addConstructiveModal = new BehaviorSubject<boolean>(false);
  addMaterialModal = new BehaviorSubject<boolean>(false);

  openModal(modalName: string) {
    //@ts-ignore
    this[modalName].next(true);
    document.body.classList.add('no-scroll');
  }

  closeModal(modalName: string) {
    //@ts-ignore
    this[modalName].next(false);
    document.body.classList.remove('no-scroll');
  }
}
