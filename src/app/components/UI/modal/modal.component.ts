import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ModalComponent {
  @Input() modalName!: string;
  @Input() opacity = '';
  faClose = faClose;
  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal(this.modalName);
  }
}
