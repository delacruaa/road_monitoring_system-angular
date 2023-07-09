import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  formGroup!: FormGroup;
  public submitted = false;
  sameColumn = false;
  errorMessage = '';
  loading = false;
  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.submitted = false;
      this.authService
        .signIn(
          this.formGroup.value['email'].trim(),
          this.formGroup.value['password'].trim()
        )
        .then(() => {
          this.loading = true;
          this.afAuth.authState.subscribe((user) => {
            if (user) {
              this.modalService.closeModal('loginModal');
            }
          });
        })
        .catch((error: { message: string }) => {
          this.errorMessage = error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
