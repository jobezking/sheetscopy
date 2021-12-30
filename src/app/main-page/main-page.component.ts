import { Component, Directive } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from "@angular/router";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

 // _clonedDocID:string;
 // _docID:string;
 // _docName:string;
  _cloned:gapi.client.drive.File;
  value:string = 'dustin.hinchy@ditoweb.com';

  copyForm = this.fb.group({
    docID: ['', Validators.required],
    docName: ['']
  });

  onSubmit(){
    var _docID:string = this.copyForm.get('docID')!.value; 
    var _docName:string = this.copyForm.get('docName')!.value; 
    this.copyfile(_docID, _docName);
    console.log("You submitted: ", _docID, _docName  );   
    this.copyForm.reset(); 
  }

  async copyfile(file_id: string, _docName: string) {
    try {
    this._cloned = (await gapi.client.drive.files.copy({
      "fileId": file_id, 'ignoreDefaultVisibility':true,'enforceSingleParent':false,'supportsAllDrives':true,
      "resource": {
        "name": _docName
      }
    })).result;
 
      } catch (error) {
        let errorMessage = "Failed to copy document. Verify that document ID exists";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(errorMessage);
        this.router.navigate(['errorpage']);
      }
       
     var perms = (await gapi.client.drive.permissions.list({"fileId": this._cloned.id!})).result;
    
     console.log(this._cloned.id, perms.permissions![0].id); 
     
     const updated = (await gapi.client.drive.permissions.create({
      'fileId': this._cloned.id!,'transferOwnership': true, 'useDomainAdminAccess':true,'enforceSingleParent':false,
      'supportsAllDrives':true,'moveToNewOwnersRoot':false,
      'resource': {'emailAddress': 'job.king@ditoweb.com', 'role': "owner", 'type':"user"}
     })).result;

     console.log(updated); 
     /**
    
     var _output = gapi.client.drive.permissions.update({
      'fileId': this._cloned.id!,
      'permissionId': perms.permissions![0].id!, //permission id of writer
      'transferOwnership': true,
      'resource': {'emailAddress': this.value, 'role': "owner"}
     }); 
     
     console.log(_output); 

   const updated = (await gapi.client.drive.files.update({
      "fileId": cloned.id!,
      "resource": { name: _docName }
     })).result;
    */
  }
 
  constructor(private fb: FormBuilder, private router: Router) { }
  
}
