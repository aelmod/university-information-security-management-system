import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    IncidentService,
    IncidentPopupService,
    IncidentComponent,
    IncidentDetailComponent,
    IncidentDialogComponent,
    IncidentPopupComponent,
    IncidentDeletePopupComponent,
    IncidentDeleteDialogComponent,
    incidentRoute,
    incidentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...incidentRoute,
    ...incidentPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IncidentComponent,
        IncidentDetailComponent,
        IncidentDialogComponent,
        IncidentDeleteDialogComponent,
        IncidentPopupComponent,
        IncidentDeletePopupComponent,
    ],
    entryComponents: [
        IncidentComponent,
        IncidentDialogComponent,
        IncidentPopupComponent,
        IncidentDeleteDialogComponent,
        IncidentDeletePopupComponent,
    ],
    providers: [
        IncidentService,
        IncidentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterIncidentModule {}
