import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  FileMeta, uploadedData } from '../logindetail';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedMajorHead: string = 'personal';
  selectedMinorHead: string ='';
  minorHeadOptions: string[] = [];
  tagsInput: string = '';
  tags: string[] = [];
  selectedFile: FileMeta = {
    name:'',
    type:'',
    lastModified:0,
    size:0,
    content:null

  };
  uploadedData:uploadedData[] = [];
  uploadDetails:uploadedData = {
    majorHead:'',
    minorHead:'',
    tags:[''],
    file: [],
    
  }
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Set initial minor head options based on selected major head
    this.setMinorHeadOptions();
  }

  setMinorHeadOptions() {
    if (this.selectedMajorHead === 'personal') {
      this.minorHeadOptions = ['User 1', 'User 2', 'User 3'];
    } else if (this.selectedMajorHead === 'professional') {
      this.minorHeadOptions = ['Department 1', 'Department 2', 'Department 3'];
    }
  }

  addTag(event:Event) {
    event.preventDefault();
    if (this.tagsInput.trim() !== '' && !this.tags.includes(this.tagsInput.trim())) {
      this.tags.push(this.tagsInput.trim());
      this.tagsInput = '';
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const content:string | ArrayBuffer | null = event.target?.result as string | ArrayBuffer | null;
      if (content !== null) {
        let blobContent: Blob | null = null;
        if (typeof content === 'string') {
          blobContent = new Blob([content], { type: file.type });
        } else {
          blobContent = new Blob([new Uint8Array(content)], { type: file.type });
        }
  
        this.selectedFile = {
          name: file.name,
          type: file.type,
          lastModified: file.lastModified,
          size: file.size,
          content: blobContent
        };
  
      }
    };
  
    reader.readAsArrayBuffer(file);
  }

  uploadFile(event:Event) {
    event.preventDefault();
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
  
    const uploadDetails: uploadedData = {
      majorHead: this.selectedMajorHead,
      minorHead: this.selectedMinorHead,
      tags: this.tags,
      file: [this.selectedFile]
    };
  
    // Push the form data to the uploadedData array
    this.uploadedData.push(uploadDetails);
  
    // Store the updated form data in localStorage
    localStorage.setItem('fileMetadata', JSON.stringify(this.uploadedData));
  }
}
