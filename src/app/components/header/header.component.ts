import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: any = null;
  loginModal = false;
  registerModal = false;
  constructor(
    private modalService: ModalService,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.modalService.loginModal.subscribe((data) => {
      this.loginModal = data;
    });
    this.modalService.registerModal.subscribe((data) => {
      this.registerModal = data;
    });
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  openLoginModal() {
    this.modalService.openModal('loginModal');
  }
  openRegisterModal() {
    this.modalService.openModal('registerModal');
  }

  logOut() {
    this.authService.logout();
    if (!this.user) {
      this.modalService.closeModal('loginModal');
    }
  }
}
