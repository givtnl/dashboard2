export interface CreateUserForCollectGroupCommand {
	email?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	appLanguage?: string;
	collectGroupId?: string;
	organisationId?: string;
}
