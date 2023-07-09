import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { ToastrService } from 'ngx-toastr';
import { IConstructive } from 'src/app/models/IProject';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-constructive-modal',
  templateUrl: './add-constructive-modal.component.html',
  styleUrls: ['./add-constructive-modal.component.scss'],
})
export class AddConstructiveModalComponent implements OnInit {
  formGroup!: FormGroup;
  public submitted = false;
  currentSelect = 'Вся ширина';
  selects = ['Вся ширина', 'Правая/Левая'];
  isSelectOpen = false;
  faArrowDown = faArrowDown;
  loading = false;
  @Input() currentRoute = '';
  constructor(
    private elementRef: ElementRef,
    private modalService: ModalService,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }
  currentContentChanged(newValue: string) {
    this.currentSelect = newValue;
    this.isSelectOpen = false;
  }
  openSelect() {
    this.isSelectOpen = !this.isSelectOpen;
  }
  closeModal() {
    this.modalService.closeModal('addProjectModal');
  }
  onKeyDown(event: any) {
    event.preventDefault();
  }
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    this.isSelectOpen = false;
  }
  submitForm() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.submitted = false;
      let data: IConstructive = {} as IConstructive;
      let id = new Date().getTime();
      if (this.currentSelect == 'Вся ширина') {
        data = {
          id: id.toString(),
          constructive: this.formGroup.value.name,
          projectLeft: null,
          projectRight: null,
          doneLeft: null,
          doneRight: null,
          todayRight: null,
          todayLeft: null,
          yesterdayLeft: null,
          yesterdayRight: null,
          project: 0,
          done: 0,
          today: 0,
          yesterday: 0,
          type: 'oneRoadway',
        };
      }
      if (this.currentSelect == 'Правая/Левая') {
        data = {
          id: id.toString(),
          constructive: this.formGroup.value.name,
          projectLeft: 0,
          projectRight: 0,
          doneLeft: 0,
          doneRight: 0,
          todayRight: 0,
          todayLeft: 0,
          yesterdayLeft: 0,
          yesterdayRight: 0,
          project: null,
          done: null,
          today: null,
          yesterday: null,
          type: 'twoRoadway',
        };
      }
      this.projectService
        .addConstructive(this.currentRoute, id, data)
        .then(() => {
          this.loading = true;
          this.toastr.success('Конструктив создан', '', {
            timeOut: 1400,
          });
          this.modalService.closeModal('addConstructiveModal');
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
