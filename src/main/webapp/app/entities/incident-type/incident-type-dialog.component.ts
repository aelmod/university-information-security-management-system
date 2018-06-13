import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IncidentType } from './incident-type.model';
import { IncidentTypePopupService } from './incident-type-popup.service';
import { IncidentTypeService } from './incident-type.service';

@Component({
    selector: 'jhi-incident-type-dialog',
    templateUrl: './incident-type-dialog.component.html'
})
export class IncidentTypeDialogComponent implements OnInit {

    incidentType: IncidentType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private incidentTypeService: IncidentTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.incidentType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.incidentTypeService.update(this.incidentType));
        } else {
            this.subscribeToSaveResponse(
                this.incidentTypeService.create(this.incidentType));
        }
    }

    private subscribeToSaveResponse(result: Observable<IncidentType>) {
        result.subscribe((res: IncidentType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: IncidentType) {
        this.eventManager.broadcast({ name: 'incidentTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-incident-type-popup',
    template: ''
})
export class IncidentTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private incidentTypePopupService: IncidentTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.incidentTypePopupService
                    .open(IncidentTypeDialogComponent as Component, params['id']);
            } else {
                this.incidentTypePopupService
                    .open(IncidentTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
