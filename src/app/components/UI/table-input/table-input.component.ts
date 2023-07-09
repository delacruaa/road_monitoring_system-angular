import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { faCheck, faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.scss'],
})
export class TableInputComponent implements OnInit {
  faClose = faClose;
  faCheck = faCheck;
  faEdit = faEdit;
  isActive = false;
  value = '';
  @Input() currentRoute = '';
  @Input() initialValue = 0;
  @Input() value1 = '';
  @Input() value2 = '';
  @Input() user: any = null;
  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.value = this.initialValue.toString();
  }
  editConstructiveItems() {
    console.log(this.currentRoute, this.value1, this.value2, this.value);
    this.projectService
      .editConstructiveItems(
        this.currentRoute,
        this.value1,
        this.value2,
        this.value
      )
      .then(() => {
        this.isActive = false;
      })
      .catch(() => {
        this.toastr.error('Ошибка повторите позже', '', {
          timeOut: 1400,
        });
        this.isActive = false;
      });
  }
  typeNumberKeyDown(event: any) {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      return this.editConstructiveItems();
    }
    if (
      event.key == '.' ||
      keyCode === 8 ||
      (keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105)
    ) {
      return true;
    } else {
      event.preventDefault();
      this.toastr.error('Вводите только цифры', '', {
        timeOut: 1400,
      });
    }
  }

  handleInput(event: any) {
    const inputValue = event.target.value;
    this.value = inputValue;
  }
}
