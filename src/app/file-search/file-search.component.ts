import { Component, OnInit } from '@angular/core';

interface UploadedData {
  majorHead: string;
  minorHead: string;
  tags: string[];
  file: File[];
}

@Component({
  selector: 'app-file-search',
  templateUrl: './file-search.component.html',
  styleUrls: ['./file-search.component.scss']
})
export class FileSearchComponent  implements OnInit{
  
  selectedMajorHead: string = 'personal';
  selectedMinorHead: string ='';
  minorHeadOptions: string[] = [];
  tagSearch: string = '';
  files: any[] = []; 

  uploadedData: UploadedData[] = []; 
  filteredData: UploadedData[] = []; 

  searchQuery: string = ''; 


  constructor() {     }

  ngOnInit(): void {
    const storedData = localStorage.getItem('fileMetadata');
    if (storedData) {
      this.uploadedData = JSON.parse(storedData);
    }
    this.filteredData = this.uploadedData; 
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
  searchFiles() {
  
    if (!this.selectedMajorHead && !this.selectedMinorHead && !this.searchQuery) {
      this.filteredData = this.uploadedData;
      return;
    }
  
    
    this.filteredData = this.uploadedData.filter(data =>
      data.tags.includes(this.searchQuery) &&
       data.minorHead === this.selectedMinorHead
    );
  
    
    console.log(this.uploadedData);
    console.log(this.filteredData);
  }
  
  previewFile(fileObj: any) {
    if (fileObj) {
       if (fileObj.content && fileObj.content.includes('data:application/pdf')) {
        // Display the PDF preview
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          // Write the PDF content to the new window
          newWindow.document.write(`<iframe width="100%" height="100%" src="${fileObj.content}"></iframe>`);
        } else {
          console.error('Failed to open new window.');
        }
      } else {
        console.error('No or invalid PDF file selected.');
        return;
      }
  }
}
downloadFile(fileObj: any) {
  if (fileObj) {
    if (fileObj.content && fileObj.content.includes('data:application/pdf')) {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = fileObj.content;
      link.target = '_blank';
      link.download = 'filename.pdf'; // You can set a custom filename here
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);
    } else {
      console.error('No or invalid PDF file selected.');
    }
  }
}
}
