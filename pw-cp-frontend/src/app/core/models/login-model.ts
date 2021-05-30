export interface Users {
    user: string;
    password: string;
}

export interface PasswordUsers {
    newPassword: string;
    repeatPassword: string;
}

export interface DataUser {
    employeeId: number;
    cTop: number;
    employeeName: string;
    roleFeatureDtoList: any;
    id: number;
    message: string;
    officeId: number;
    officeName: string;
    passwordToBeChanged: number;
    roleId: number;
    roleName: string;
    username: string;
    immediateBossId: number;
    employeeFirstSurName: string;
    positionId: any;
}

