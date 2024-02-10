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
    if (this.selectedFile.type === '') {
      alert('No file selected.');
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
    alert('File uploaded successfully!');  
  }

}
