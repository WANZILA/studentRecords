export interface Admin {
   adminId: string;
   fname: string ;
	 mname: string ;
	 lname: string ;
	 title: string ;
	 gender: string ;
	 birthDate: string ;
	 maritalStatus: string ;
	 children: string ;	
	 employmentStatus: string;
	 employmentDate: string;
	 unemploymentDate: string;
	 branchNum: string;
	 role: string;
	 nation: string  ;
	 district: string  ;
	 county: string ;
	 subCounty: string ;
	 parish: string ;
	 village: string ;
	 phoneAddress1: string ;
	 phoneAddress2: string ;
	 emailAddress: string ;
	 updatedBy: string;
	 departCode: string;
	 username: string;
	 
}

export interface Admin_Reg {
	adminId: string;
	fname: string ;
	lname: string ;
	title: string ;
}

// export interface Admin_Search {
// 	adminId: string;

// 	fname: string ;
// 	lname: string ;
// }