import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  faPlus = faPlus;
  projectList: string[] = [];
  currentRoute = '';
  addProjectModal = false;
  loginModal = false;
  loading = false;
  error = false;
  registerModal = false;
  user: any = null;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private modalService: ModalService,
    private afAuth: AngularFireAuth
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.projectService.getProjectList().subscribe(
      (item) => {
        this.projectList = Object.keys(item!);
        this.currentRoute = this.router.url;
        this.loading = false;
      },
      (error) => {
        this.error = true;
        this.loading = false;
      }
    );
    this.modalService.addProjectModal.subscribe((data) => {
      this.addProjectModal = data;
    });
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  openAddProjectModal() {
    this.modalService.openModal('addProjectModal');
  }
}
