import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { IncidentType } from './incident-type.model';
import { IncidentTypeService } from './incident-type.service';

@Component({
    selector: 'jhi-incident-type-detail',
    templateUrl: './incident-type-detail.component.html'
})
export class IncidentTypeDetailComponent implements OnInit, OnDestroy {

    incidentType: IncidentType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private incidentTypeService: IncidentTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIncidentTypes();
    }

    load(id) {
        this.incidentTypeService.find(id).subscribe((incidentType) => {
            this.incidentType = incidentType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIncidentTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'incidentTypeListModification',
            (response) => this.load(this.incidentType.id)
        );
    }
}
