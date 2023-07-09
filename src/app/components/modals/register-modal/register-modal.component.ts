import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent {
  formGroup!: FormGroup;
  public submitted = false;
  sameColumn = false;
  loading = false;
  constructor(
    private modalService: ModalService,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      organization: new FormControl('', [Validators.required]),
      major: new FormControl('', [Validators.required]),
    });
  }

  submitForm(e: Event) {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.submitted = false;
      this.loading = true;
      emailjs
        .send(
          'service_n336yno',
          'template_xyxhlpg',
          this.formGroup.value,
          'WDejzSAbLUCwQnBoy'
        )
        .then(
          (result: EmailJSResponseStatus) => {
            if (result.status == 200) {
              this.toastr.success('Заявка успешно отправлена', '', {
                timeOut: 1400,
              });
              this.loading = false;
              this.modalService.closeModal('registerModal');
            }
          },
          () => {
            this.toastr.error('Что-то пошло не так попробуйте позже', '', {
              timeOut: 1400,
            });
            this.loading = false;
          }
        );
    }
  }
}
