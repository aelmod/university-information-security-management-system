import { BaseEntity } from './../../shared';

export class IncidentType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public incedents?: BaseEntity[],
    ) {
    }
}
