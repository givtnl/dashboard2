export interface CreateUserForCollectGroupCommand {
	email?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	appLanguage?: string;
	country?: string;
	timezone?: string;  
	collectGroupId?: string;
	organisationId?: string;
}
