import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit {
  faTrash = faTrash;
  faArrowRight = faArrowRight;
  @Input() projectName: string = '';
  translateName: string = '';
  confirmDeleteModal = false;
  user: any = null;
  constructor(
    private modalService: ModalService,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth
  ) {}
  ngOnInit(): void {
    this.translateName =
      this.projectName.length > 2
        ? cyrillicToTranslit().reverse(
            this.projectName.substring(14).replace(/_/g, ' ')
          )
        : cyrillicToTranslit().reverse(this.projectName);
    this.modalService.confirmDeleteModal.subscribe((data) => {
      this.confirmDeleteModal = data;
    });
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  openConfirmModal() {
    this.modalService.openModal('confirmDeleteModal');
  }
  deleteProjectItem() {
    this.projectService
      .deleteProject(this.projectName)
      .then(() => {
        this.closeModal();
      })
      .catch(() => {
        this.toastr.error('Ошибка повторите позже', '', {
          timeOut: 1400,
        });
        this.closeModal();
      });
  }
  closeModal() {
    this.modalService.closeModal('confirmDeleteModal');
  }
}
