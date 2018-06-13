import { BaseEntity } from './../../shared';

export class Job implements BaseEntity {
    constructor(
        public id?: number,
        public jobTitle?: string,
        public employees?: BaseEntity[],
    ) {
    }
}
