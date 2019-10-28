import { Component, OnInit } from '@angular/core';
import { DocLinkID } from '../../../core/objects/docLink';

import { SafetyDocsService } from '../../shared/safety-docs/safety-docs.service';
import { AuthenticationService } from '../../../core/auth/authentication.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-safety-docs',
  templateUrl: './safety-docs.component.html',
  styleUrls: ['./safety-docs.component.css']
})
export class SafetyDocsComponent implements OnInit {
  links: DocLinkID[];
  editMode = false;
  admin: boolean;

  constructor(
    private safetyDocsService: SafetyDocsService,
    private FIREBASE_AUTH: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.links = this.safetyDocsService.safetyDocLinks;
    this.FIREBASE_AUTH.isAdmin.subscribe(bool => {
      this.admin = bool;
    });
  }

  isAdmin(): Boolean {
    return this.admin;
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
