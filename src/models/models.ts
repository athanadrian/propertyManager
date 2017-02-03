export class Payment {
    title: string;
    type: string;
    deptDate: string;
    amount: number;
    dueDate: string = null;
    paidDate: string = null;
    paid: boolean = false;
    totalAmount: number = 0;
}

export class Property {
    $key?:string;
    title: string;
    type: string;
    address: string;
    totalLeaseholds: number;
    leaseholds;
    marker?: {
        lat: number,
        lng: number,
        icon: string
    };
}

export class Renter {
    title: string;
    type: string;
    name: string;
    phone: string;
    email: string
    website: string;
    isActive: boolean;
    rentAmount: number;
    totalDeptAmount: number;
}

export class Contract {
    renter: Renter;
    leaseholdId: string;
    renterId: string;
    initialDuration: number;
    realDuration: number;
    rentAmount:number;
    isActive: boolean;
    startDate: string;
    endDate: string;
}

export class Leasehold {
    title: string;
    type: string;
    code: string;
    size: number;
    currentAmount: number;
    activeAmount: number;
    isRented: boolean;
}

export class Owner {
    title: string;
    quota: string;
}