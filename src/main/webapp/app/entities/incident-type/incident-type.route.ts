import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IncidentTypeComponent } from './incident-type.component';
import { IncidentTypeDetailComponent } from './incident-type-detail.component';
import { IncidentTypePopupComponent } from './incident-type-dialog.component';
import { IncidentTypeDeletePopupComponent } from './incident-type-delete-dialog.component';

export const incidentTypeRoute: Routes = [
    {
        path: 'incident-type',
        component: IncidentTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.incidentType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'incident-type/:id',
        component: IncidentTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.incidentType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incidentTypePopupRoute: Routes = [
    {
        path: 'incident-type-new',
        component: IncidentTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.incidentType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'incident-type/:id/edit',
        component: IncidentTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.incidentType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'incident-type/:id/delete',
        component: IncidentTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.incidentType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
