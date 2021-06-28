import { Component, OnInit } from "@angular/core";
import mixpanel from "mixpanel-browser";

@Component({
    selector: 'app-bank-statement-upload-complete',
    templateUrl: './bank-statement-upload-complete.component.html',
    styleUrls: ['./bank-statement-upload-complete.component.scss']
}) export class BankStatementUploadCompleteComponent implements OnInit {
    ngOnInit(): void {
        mixpanel.track("bankStatementUpload:end");
    }
}