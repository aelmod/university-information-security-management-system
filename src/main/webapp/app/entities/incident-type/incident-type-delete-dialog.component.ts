import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IncidentType } from './incident-type.model';
import { IncidentTypePopupService } from './incident-type-popup.service';
import { IncidentTypeService } from './incident-type.service';

@Component({
    selector: 'jhi-incident-type-delete-dialog',
    templateUrl: './incident-type-delete-dialog.component.html'
})
export class IncidentTypeDeleteDialogComponent {

    incidentType: IncidentType;

    constructor(
        private incidentTypeService: IncidentTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.incidentTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'incidentTypeListModification',
                content: 'Deleted an incidentType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-incident-type-delete-popup',
    template: ''
})
export class IncidentTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private incidentTypePopupService: IncidentTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.incidentTypePopupService
                .open(IncidentTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
