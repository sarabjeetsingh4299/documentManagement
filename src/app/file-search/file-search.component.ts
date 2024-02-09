import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

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
  majorHeads: string[] = ['Personal', 'Professional']; 
  minorHeads: string[] = ['Department 1', 'Department 2','Department 3']; 
  selectedMajorHead: string = '';
  selectedMinorHead: string = '';
  tagSearch: string = '';
  files: any[] = []; 

  uploadedData: UploadedData[] = []; 
  filteredData: UploadedData[] = []; 

  searchQuery: string = ''; 


  constructor(private service:UserService) {     }

  ngOnInit(): void {
    const storedData = localStorage.getItem('fileMetadata');
    if (storedData) {
      this.uploadedData = JSON.parse(storedData);
    }
    this.filteredData = this.uploadedData; 

  }
  searchFiles() {
    
    if (!this.selectedMajorHead && !this.selectedMinorHead && !this.searchQuery) {
      this.filteredData = this.uploadedData;
      return;
    }
  
    
    this.filteredData = this.uploadedData.filter(data =>
      data.tags.includes(this.searchQuery) &&
      data.majorHead === this.selectedMajorHead &&
      data.minorHead === this.selectedMinorHead && console.log(data.tags.includes(this.searchQuery))
      
    );
  
    
    console.log(this.uploadedData);
    console.log(this.filteredData);
  }
  
  ddownloadFile(fileObj: any) {
    if (fileObj) {
      this.service.downloadFile().subscribe((res)=>{
        console.log("data",res);
      })
    } else {
      console.error('File object is null or undefined.');
    }
  }
}
