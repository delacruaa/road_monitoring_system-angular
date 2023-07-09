import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IConstructive, IMaterial } from 'src/app/models/IProject';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
})
export class MaterialListComponent implements OnInit {
  @Input() currentRoute!: string;
  materials: IMaterial[] = [];

  faClose = faClose;
  fileName = 'ДСМ.xlsx';
  today = new Date(new Date().setDate(new Date().getDate() - 1))
    .toLocaleString()
    .substring(0, 10);
  yesterday = new Date().toLocaleString().substring(0, 10);
  user: any = null;
  constructor(
    private projectService: ProjectService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private afAuth: AngularFireAuth
  ) {}
  ngOnInit() {
    this.projectService.getProjectList().subscribe((project) => {
      //@ts-ignore
      this.materials = Object.values(project[this.currentRoute]['material']);
    });
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  openMaterialModal() {
    this.modalService.openModal('addMaterialModal');
  }

  deleteMaterial(id: number) {
    this.spinner.show();
    this.projectService
      .deleteMaterial(this.currentRoute, id)
      .then(() => {
        this.toastr.success('Материал Удален', '', {
          timeOut: 1400,
        });
      })
      .catch(() => {
        this.toastr.error('Ошибка повторите позже', '', {
          timeOut: 1400,
        });
      })
      .finally(() => {
        this.spinner.hide();
      });
  }

  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
}
