import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  formGroup!: FormGroup;
  public submitted = false;
  loading = false;
  constructor(
    private modalService: ModalService,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  closeModal() {
    this.modalService.closeModal('addProjectModal');
  }
  submitForm() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.submitted = false;
      let id = new Date().getTime();
      let translit = cyrillicToTranslit().transform(
        this.formGroup.value.name.trim().replace(/№/g, ''),
        '_'
      );
      this.loading = true;
      this.projectService
        .addProject(`${id + '-' + translit}`)
        .then(() => {
          this.toastr.success('Объект создан', '', {
            timeOut: 1400,
          });
          this.modalService.closeModal('addProjectModal');
        })
        .catch(() => {
          this.toastr.error('Ошибка повторите позже', '', {
            timeOut: 1400,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
