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
    content:''

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
    const recentimage = localStorage.getItem("filedata");
    this.getUsers();
  }

  seePreivew(){
    
  }

  getUsers() {
    const storedUserList = localStorage.getItem('userList');
    if (storedUserList) {
      const userList: any[] = JSON.parse(storedUserList);
      this.minorHeadOptions = userList
      .filter(user => user.role === 'user')
      .map(user => user.username);
  
    }
  }
  setMinorHeadOptions() {
    if (this.selectedMajorHead === 'personal') {
     this.getUsers();
    } else if (this.selectedMajorHead === 'professional') {
      this.minorHeadOptions = ['Education', 'Finance', 'Housing'];
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
  // const reader = new FileReader();

  // reader.onload = (event) => {
  //   const content:string | ArrayBuffer | null = event.target?.result as string | ArrayBuffer | null;
  //   if (content !== null) {
  //     let blobContent: Blob | null = null;
  //     if (typeof content === 'string') {
  //       blobContent = new Blob([content], { type: file.type });
  //     } else {
  //       blobContent = new Blob([new Uint8Array(content)], { type: file.type });
  //     }

     

  //   }
  // };

  // reader.readAsArrayBuffer(file);

  onFileSelected(event: any) {
     const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load",()=>{
      this.selectedFile = {
        name: file.name,
        type: file.type,
        lastModified: file.lastModified,
        size: file.size,
        content: reader.result as string
      };
      
    })
    reader.readAsDataURL(file);
    console.log(file);
    
  }

  uploadFile(event:Event) {
    event.preventDefault();
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
  //  const upload = localStorage.getItem("filedata");
  //  if (upload && upload.includes('data:application/pdf')) {
  //   // Display the PDF preview
  //   const newWindow = window.open('', '_blank');
  //   if (newWindow) {
  //     // Write the PDF content to the new window
  //     newWindow.document.write(`<iframe width="100%" height="100%" src="${upload}"></iframe>`);
  //   } else {
  //     console.error('Failed to open new window.');
  //   }
  // } else {
  //   console.error('No or invalid PDF file selected.');
  //   return;
  // }
  
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
