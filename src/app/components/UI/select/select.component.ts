import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() contents: string[] = [];
  @Input() currentContent = '';
  @Output() currentContentChanged: EventEmitter<string> = new EventEmitter();
  @Input() isDropdownOpen!: boolean;
  faCheck = faCheck;
  editCurrentContent(content: string) {
    this.contents.forEach((item) => {
      if (content == item) {
        this.currentContent = content;
        this.currentContentChanged.emit(content);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    this.isDropdownOpen = false;
  }
}
