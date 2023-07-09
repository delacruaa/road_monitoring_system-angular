import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-add-graphic-modal',
  templateUrl: './add-graphic-modal.component.html',
  styleUrls: ['./add-graphic-modal.component.scss'],
})
export class AddGraphicModalComponent {
  formGroup!: FormGroup;
  public submitted = false;
  faClose = faClose;
  @Input() currentRoute!: string;
  constructor(
    private modalService: ModalService,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      graphicName: new FormControl('', [Validators.required]),
      startPK: new FormControl('', [Validators.required]),
      lastPK: new FormControl('', [Validators.required]),
      graphics: new FormArray([
        new FormGroup({
          graphicValue: new FormControl('', [Validators.required]),
        }),
      ]),
    });
  }
  get graphicFormGroups() {
    return this.formGroup.get('graphics') as FormArray;
  }
  addGraphic() {
    const graphic = <FormArray>this.formGroup.controls['graphics'];
    graphic.push(
      new FormGroup({
        graphicValue: new FormControl('', [Validators.required]),
      })
    );
  }
  removeGraphic(index: number) {
    const graphic = <FormArray>this.formGroup.controls['graphics'];
    graphic.removeAt(index);
  }

  submitForm() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.submitted = false;
      let id = new Date().getTime();
      //@ts-ignore
      this.formGroup.value.graphics.forEach(async (item, index) => {
        for (
          let i = +this.formGroup.value.startPK;
          i <= +this.formGroup.value.lastPK;
          i++
        ) {
          await this.projectService
            .addGraphic(
              this.currentRoute,
              id,
              this.formGroup.value.graphicName.replace(/[.#$\[\]\d]/g, ''),
              index,
              item.graphicValue,
              i
            )
            .then(() => {
              this.modalService.closeModal('addGraphicModal');
            });
        }
      });
    }
  }
}
