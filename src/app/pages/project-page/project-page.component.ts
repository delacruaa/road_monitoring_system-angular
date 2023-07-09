import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { finalize } from 'rxjs';
import { IObject } from 'src/app/models/IProject';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  projectName = '';
  currentRoute = '';
  addGraphicModal = false;
  addConstructiveModal = false;
  addMaterialModal = false;
  faArrowLeft = faArrowLeft;
  loading = false;
  error = false;
  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private projectService: ProjectService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentRoute = params['id'];
      this.projectName = cyrillicToTranslit().reverse(
        params['id'].substring(14).replace(/_/g, ' ')
      );
    });
    this.loading = true;
    this.projectService.getProjectList().subscribe(
      (project) => {
        if (project) {
          this.loading = false;
        }
      },
      (error) => {
        this.error = true;
        this.loading = false;
      }
    );
    this.modalService.addConstructiveModal.subscribe((data) => {
      this.addConstructiveModal = data;
    });
    this.modalService.addGraphicModal.subscribe((data) => {
      this.addGraphicModal = data;
    });
    this.modalService.addMaterialModal.subscribe((data) => {
      this.addMaterialModal = data;
    });
  }
}
