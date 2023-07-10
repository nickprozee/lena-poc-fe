
export class ResponseCodesFactory {
    static create(responseCode: number): string {
        switch (responseCode) {
            case 400:
                return 'De aangeleverde metadata voldoen niet aan het schema';
            default:
                return "Er is een fout opgetreden";
        }
    }
}