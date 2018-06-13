import { BaseEntity } from './../../shared';

export class Department implements BaseEntity {
    constructor(
        public id?: number,
        public building?: string,
        public departmentName?: string,
        public room?: string,
        public employees?: BaseEntity[],
        public incidents?: BaseEntity[],
    ) {
    }
}
