import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterIncidentModule } from './incident/incident.module';
import { JhipsterEmployeeModule } from './employee/employee.module';
import { JhipsterJobModule } from './job/job.module';
import { JhipsterDepartmentModule } from './department/department.module';
import { JhipsterIncidentTypeModule } from './incident-type/incident-type.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterIncidentModule,
        JhipsterEmployeeModule,
        JhipsterJobModule,
        JhipsterDepartmentModule,
        JhipsterIncidentTypeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}
