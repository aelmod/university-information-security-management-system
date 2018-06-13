import { BaseEntity } from './../../shared';

export class Employee implements BaseEntity {
    constructor(
        public id?: number,
        public fullName?: string,
        public phoneNumber?: string,
        public alternativePhoneNumber?: string,
        public cityPhoneNumber?: string,
        public fax?: string,
        public email?: string,
        public incedents?: BaseEntity[],
        public job?: BaseEntity,
        public department?: BaseEntity,
    ) {
    }
}
