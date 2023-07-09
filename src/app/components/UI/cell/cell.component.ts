import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  isDoneLocal!: boolean;
  @Input() isDone!: boolean;
  @Input() graphicName!: string;
  @Input() constrictiveName!: string;
  @Input() cellNum!: number;
  @Input() currentRoute!: string;
  user: any = null;
  constructor(private projectService: ProjectService) {}
  ngOnInit(): void {
    this.isDoneLocal = this.isDone;
  }

  changeIsDone() {
    this.isDoneLocal = !this.isDoneLocal;
    this.projectService.updateDoneCell(
      this.currentRoute,
      this.graphicName,
      this.constrictiveName,
      this.isDone,
      this.cellNum
    );
  }
}
