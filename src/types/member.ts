export interface Address {
	homeAddress: string;
	workAddress: string;
}

export interface Phone {
	mainPhone: string;
	otherPhone: (string | null)[];
}

export interface Anniversary {
	name: string;
	date: string;
	_id: string;
	id: string;
}

export interface Profile {
	address: Address;
	phone: Phone;
	firstName: string;
	middleName: string;
	lastName: string;
	suffix: string;
	prefix: string;
	gender: string;
	maritalStatus: string;
	anniversaries: Anniversary[];
	email: string;
	workerStatus: boolean;
	worker: string;
	active: boolean;
	educationalLevel: string;
	healthStatus: string;
	employmentStatus: string;
	photo: string;
	serviceUnit: string;
	dateOfBirth: string;
}

export interface OrgRole {
	_id: string;
	name: string;
}

export interface Note {
	comment: string;
	date: string;
	member?: string;
	type: string;
	_id: string;
	id: string;
}

export interface createdBy {
	profile: {
		firstName: string;
		lastName: string;
	};
}

export interface Member {
	profile: Profile;
	_id: string;
	firstName: string;
	lastName: string;
	fullName: string;
	photo: string;
	userId: string;
	churchId: string;
	orgRole: OrgRole;
	contactType: string;
	verification: string;
	contactStatus: string;
	memberStatus: string;
	maturityLevel: string;

	notes: Note[];
	createdAt: string;
	updatedAt: string;
	age: number;
	id: string;
	createdBy: createdBy;
}

export interface Members {
	_id: string;
	photo: string;
	firstName: string;
	lastName: string;
	fullName: string;
	email: string;
	gender: string;
	phone: string;
	dateOfBirth: string;
	dateJoined: string;
}

// Contacts
