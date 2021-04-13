import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BankStatementStateService {
    private file: File;

    setFile(file: File): boolean {
        // File should not be bigger than 8 Mb
        if (file.size > 8 * 1024 * 1024)
            return false;
        
        this.file = file;
        return true;
    }

    getFile(): File {
        return this.file;
    }

    async getFileAsBase64String(): Promise<string> {
        let bytes = new Uint8Array(await this.file.arrayBuffer());
        var binary = "";
        for (var i = 0; i < bytes.length; ++i) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
}