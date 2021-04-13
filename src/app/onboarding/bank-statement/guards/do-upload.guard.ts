import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { ExportBankAccountStatementCommand } from "src/app/bank-accounts/models/commands/export-bank-account-statement.command";
import { BankAccountService } from "src/app/bank-accounts/services/bank-account.service";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { BankStatementStateService } from "../services/bank-statement-state.service";

@Injectable({
    providedIn: 'root'
})
export class UploadStatementGuard implements CanActivate {
    constructor(private bankStatementStateService: BankStatementStateService,
        private bankAccountService: BankAccountService,
        private applicationStateService: ApplicationStateService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let command: ExportBankAccountStatementCommand = {
            BankStatement: await this.bankStatementStateService.getFileAsBase64String(),
            ContentType: this.bankStatementStateService.getFile().type
        };
        await this.bankAccountService.uploadStatement(this.applicationStateService.currentTokenModel.OrganisationAdmin, command);
        return true;
    }
}