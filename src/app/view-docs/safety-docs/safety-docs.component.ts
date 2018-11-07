import { Component, OnInit } from '@angular/core';
import { DocLinkID } from '../../Utils/objects/docLink';

import { SafetyDocsService } from '../../safety-docs.service';
import { AuthenticationService } from '../../authentication.service';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-safety-docs',
  templateUrl: './safety-docs.component.html',
  styleUrls: ['./safety-docs.component.css']
})
export class SafetyDocsComponent implements OnInit {
  links: DocLinkID[];
  editMode: Boolean = false;
  constructor(private safetyDocsService: SafetyDocsService, public FIREBASE_AUTH: AuthenticationService, private snackBar: MatSnackBar, ) {
    this.links = safetyDocsService.safetyDocLinks;
  }

  ngOnInit() {
  }

  isAdmin(): Boolean {
    return this.FIREBASE_AUTH.isAdmin;
  }

  editModeToggle() {
    this.editMode = !this.editMode;
  }

  addItem() {
    this.links.push(new DocLinkID('', ''));
  }

  setDocItem(updatedOriginalDocs) {
    const updatedDoc = updatedOriginalDocs.updatedDoc;
    const originalDoc = updatedOriginalDocs.originalDoc;
    originalDoc.id = this.safetyDocsService.addOrUpdateDoc(updatedDoc);
    this.snackBar.open('Modified the document', 'Undo', {
      duration: 2000,
    }).onAction().subscribe(() => {
      this.safetyDocsService.restore(originalDoc);
    });

  }

  deleteDocItem(doc: DocLinkID) {
    this.safetyDocsService.deleteDoc(doc);
    this.snackBar.open('Deleted: ' + doc.title, 'Undo', {
      duration: 2000,
    }).onAction().subscribe(() => {
      this.safetyDocsService.restore(doc);
    });
  }
}
