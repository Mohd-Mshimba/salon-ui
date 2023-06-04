import { DocumentsService } from 'src/app/modules/services/documents.service';
import { ChangeDetectorRef, Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Documents } from 'src/app/modules/models/documents.model';

@Component({
  selector: 'app-preview-document',
  templateUrl: './preview-document.component.html',
  styleUrls: ['./preview-document.component.scss']
})
export class PreviewDocumentComponent {
  file: any = null;
  btnicon!: string;
  name!: string;
  title: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: {item:Documents},
    public matDialogRef: MatDialogRef<PreviewDocumentComponent>,
    private documentsService: DocumentsService,
  ) {}

  closeThisModal(close: boolean) {
    if (close) {
    }
  }

  ngOnInit(): void {
    const data = this.data.item;
    this.file = `data:application/pdf;base64,${data.documentFile}`;
  }
}
