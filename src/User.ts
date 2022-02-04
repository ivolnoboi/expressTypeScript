export class User {
    private _email: string;
    private _password: string;

    public get email(): string{
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    constructor(email: string, password: string) {
        if (this.checkEmail(email)){
            this._email = email;
        } else {
            throw new Error('Invalid email address');
        }
        this._password = password;
    }

    private checkEmail(email: string): boolean {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
}