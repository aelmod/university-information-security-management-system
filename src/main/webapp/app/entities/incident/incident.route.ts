import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IncidentComponent } from './incident.component';
import { IncidentDetailComponent } from './incident-detail.component';
import { IncidentPopupComponent } from './incident-dialog.component';
import { IncidentDeletePopupComponent } from './incident-delete-dialog.component';

export const incidentRoute: Routes = [
    {
        path: 'incident',
        component: IncidentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'incident/:id',
        component: IncidentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incidentPopupRoute: Routes = [
    {
        path: 'incident-new',
        component: IncidentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'incident/:id/edit',
        component: IncidentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'incident/:id/delete',
        component: IncidentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
