import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ICell, IGraphic } from 'src/app/models/IProject';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-graphic-list',
  templateUrl: './graphic-list.component.html',
  styleUrls: ['./graphic-list.component.scss'],
})
export class GraphicListComponent {
  @Input() currentRoute!: string;
  user: any = null;
  graphicKeys: string[] = [];
  graphicValues: IGraphic[] = [];
  currentGraphicName = '';
  faClose = faClose;
  confirmDeleteModal = false;
  constructiveName: string[] = [];
  constructor(
    private projectService: ProjectService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth
  ) {}
  ngOnInit() {
    this.projectService.getProjectList().subscribe((project) => {
      //@ts-ignore
      this.graphicKeys = Object.keys(project[this.currentRoute]['graph']);

      //@ts-ignore
      this.graphicValues = Object.values(project[this.currentRoute]['graph']);
    });
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

  getObjectKeys(obj: any): any[] {
    return Object.keys(obj);
  }

  getObjectValues(obj: any): any[] {
    return Object.values(obj);
  }

  openAddGraphicrModal() {
    this.modalService.openModal('addGraphicModal');
  }
  openConfirmModal(id: string) {
    this.currentGraphicName = id;
    this.modalService.openModal('confirmDeleteModal');
  }
  closeModal() {
    this.modalService.closeModal('confirmDeleteModal');
  }
  deleteGraphic() {
    this.projectService
      .deleteGraphic(this.currentRoute, this.currentGraphicName)
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
}
