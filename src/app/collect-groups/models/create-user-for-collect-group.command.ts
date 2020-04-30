export interface CreateUserForCollectGroupCommand {
	email?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	collectGroupId?: string;
	organisationId?: string;
}
