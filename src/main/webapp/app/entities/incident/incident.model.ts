import { BaseEntity } from './../../shared';

export class Incident implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public employee?: BaseEntity,
        public department?: BaseEntity,
        public incidentType?: BaseEntity,
    ) {
    }
}
