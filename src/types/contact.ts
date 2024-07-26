import AssignedTo from "../components/Contact/AssignedTo";

export interface Address {
	homeAddress: string;
}

export interface Note {
	comment: string;
	date: string;
	member?: {
		profile: {
			firstName: string;
			lastName: string;
			photo: string;
		};
	};
	type: string;
	_id: string;
	id: string;
}

export interface Profile {
	firstName: string;
	lastName: string;
	gender: string;
	address: Address;
	email: string;
	phone: {
		mainPhone: string;
	};
	educationalLevel: string;
	healthStatus: string;
	employmentStatus: string;
}

export interface Action {
	id: string;
	name: string;
	completed: boolean;
}

export interface AssignedTo {
	_id: string;
	id: string;
	profile: {
		firstName: string;
		lastName: string;
		photo: string;
	};
}

export interface Labels {
	id: string;
	label: string;
	color: string;
}

export interface Contact {
	_id: string;
	profile: Profile;
	contactType: string;
	contactStatus: string;
	memeberStatus: string;
	maturityLevel: string;
	assignedTo: AssignedTo[] | [];
	labels: Labels[];
	actions: Action[];
	notes: Note[];
	createdBy: {
		profile: {
			firstName: string;
			lastName: string;
		};
	};
	modifiedBy: {
		profile: {
			firstName: string;
			lastName: string;
		};
	};
	createdAt: string;
	updatedAt: string;
}

export interface Contacts {
	id: string;
	firstName: string;
	lastName: string | null;
	photo: string;
	phone: string;
	gender: string;
	address: string;
	email: string;
	assignedTo: AssignedTo[] | [];
	action: Action[];
	contactStatus: string;
	educationalLevel: string;
	healthStatus: string;
	employmentStatus: string;
	labels: Labels[];
	notes: Note[];
	maturityLevel: string;
	memberStatus: string;
	createdAt: string;
	updatedAt: string;
}
