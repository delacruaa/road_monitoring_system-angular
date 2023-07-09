import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { IConstructive, IMaterial } from 'src/app/models/IProject';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-material-modal',
  templateUrl: './add-material-modal.component.html',
  styleUrls: ['./add-material-modal.component.scss'],
})
export class AddMaterialModalComponent implements OnInit {
  isSelectMaterialOpen = false;
  isSelectMaterialTypeOpen = false;
  isSelectUnitOpen = false;
  faArrowDown = faArrowDown;
  @Input() currentRoute = '';
  loading = false;
  materials = ['Щебень', 'Цемент', 'Битум', 'Мин Порошок', 'ЖБИ'];
  rubbles = ['0-5', '5-10', '5-20', '10-20', '20-40', '40-70', '0-40', '0-80'];
  bitum = ['100/130', '70/100'];
  cement = ['M500 (ЦЕМ I 42,5 Н)', 'M400 (ЦЕМ II А-Ш 32,5Н)'];
  unit = ['м3', 'тн', 'кг', 'л'];
  currentMaterial = 'Щебень';
  currentMaterialType = '0-5';
  currentUnit = 'м3';
  constructor(
    private elementRef: ElementRef,
    private modalService: ModalService,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}
  currentChangedMaterial(newValue: string) {
    this.currentMaterial = newValue;
    if (newValue == 'Щебень') this.currentMaterialType = this.rubbles[0];
    if (newValue == 'Цемент') this.currentMaterialType = this.cement[0];
    if (newValue == 'Битум') this.currentMaterialType = this.bitum[0];
    if (newValue == 'Мин Порошок' || newValue == 'ЖБИ')
      this.currentMaterialType = '';
    this.isSelectMaterialOpen = false;
  }
  currentChangedMaterialType(newValue: string) {
    this.currentMaterialType = newValue;
    this.isSelectMaterialTypeOpen = false;
  }
  currentChangedUnit(newValue: string) {
    this.currentUnit = newValue;
    this.isSelectUnitOpen = false;
  }
  openSelectMaterial() {
    this.isSelectMaterialOpen = !this.isSelectMaterialOpen;
  }
  openSelectMaterialType() {
    this.isSelectMaterialTypeOpen = !this.isSelectMaterialTypeOpen;
  }
  openSelectUnit() {
    this.isSelectUnitOpen = !this.isSelectUnitOpen;
  }
  onKeyDown(event: any) {
    event.preventDefault();
  }

  submitForm() {
    let id = new Date().getTime();
    let data: IMaterial = {
      id: id,
      done: 0,
      today: 0,
      yesterday: 0,
      project: 0,
      type: this.currentMaterial + ' ' + this.currentMaterialType,
      unit: this.currentUnit,
    };
    this.projectService
      .addMaterial(this.currentRoute, id, data)
      .then(() => {
        this.loading = true;
        this.toastr.success('Материал создан', '', {
          timeOut: 1400,
        });
        this.modalService.closeModal('addMaterialModal');
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
