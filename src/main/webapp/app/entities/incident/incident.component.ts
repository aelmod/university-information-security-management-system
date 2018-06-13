import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Incident } from './incident.model';
import { IncidentService } from './incident.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-incident',
    templateUrl: './incident.component.html'
})
export class IncidentComponent implements OnInit, OnDestroy {
incidents: Incident[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private incidentService: IncidentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.incidentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.incidents = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIncidents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Incident) {
        return item.id;
    }
    registerChangeInIncidents() {
        this.eventSubscriber = this.eventManager.subscribe('incidentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
