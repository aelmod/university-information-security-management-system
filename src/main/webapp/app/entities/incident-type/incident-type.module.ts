import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    IncidentTypeService,
    IncidentTypePopupService,
    IncidentTypeComponent,
    IncidentTypeDetailComponent,
    IncidentTypeDialogComponent,
    IncidentTypePopupComponent,
    IncidentTypeDeletePopupComponent,
    IncidentTypeDeleteDialogComponent,
    incidentTypeRoute,
    incidentTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...incidentTypeRoute,
    ...incidentTypePopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IncidentTypeComponent,
        IncidentTypeDetailComponent,
        IncidentTypeDialogComponent,
        IncidentTypeDeleteDialogComponent,
        IncidentTypePopupComponent,
        IncidentTypeDeletePopupComponent,
    ],
    entryComponents: [
        IncidentTypeComponent,
        IncidentTypeDialogComponent,
        IncidentTypePopupComponent,
        IncidentTypeDeleteDialogComponent,
        IncidentTypeDeletePopupComponent,
    ],
    providers: [
        IncidentTypeService,
        IncidentTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterIncidentTypeModule {}
