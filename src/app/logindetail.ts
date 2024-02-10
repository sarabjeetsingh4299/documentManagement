export interface Logindetail {
    username:string,
    password:string
}

export interface UsersDetails {
    username:string,
    password:string,
    email:string,
    role:string
}

export interface uploadedData {
    majorHead:string,
    minorHead:string,
    tags:string[],
    file:FileMeta[]
}

export interface FileMeta {
    name:string,
    type:string,
    lastModified:number,
    size:number,
    content: string; 
}