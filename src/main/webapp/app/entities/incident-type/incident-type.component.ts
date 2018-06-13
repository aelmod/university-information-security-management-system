import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IncidentType } from './incident-type.model';
import { IncidentTypeService } from './incident-type.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-incident-type',
    templateUrl: './incident-type.component.html'
})
export class IncidentTypeComponent implements OnInit, OnDestroy {
incidentTypes: IncidentType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private incidentTypeService: IncidentTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.incidentTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.incidentTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIncidentTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IncidentType) {
        return item.id;
    }
    registerChangeInIncidentTypes() {
        this.eventSubscriber = this.eventManager.subscribe('incidentTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
