import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Incident } from './incident.model';
import { IncidentPopupService } from './incident-popup.service';
import { IncidentService } from './incident.service';
import { Employee, EmployeeService } from '../employee';
import { Department, DepartmentService } from '../department';
import { IncidentType, IncidentTypeService } from '../incident-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-incident-dialog',
    templateUrl: './incident-dialog.component.html'
})
export class IncidentDialogComponent implements OnInit {

    incident: Incident;
    isSaving: boolean;

    employees: Employee[];

    departments: Department[];

    incidenttypes: IncidentType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private incidentService: IncidentService,
        private employeeService: EmployeeService,
        private departmentService: DepartmentService,
        private incidentTypeService: IncidentTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.employeeService.query()
            .subscribe((res: ResponseWrapper) => { this.employees = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.departmentService.query()
            .subscribe((res: ResponseWrapper) => { this.departments = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.incidentTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.incidenttypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.incident.id !== undefined) {
            this.subscribeToSaveResponse(
                this.incidentService.update(this.incident));
        } else {
            this.subscribeToSaveResponse(
                this.incidentService.create(this.incident));
        }
    }

    private subscribeToSaveResponse(result: Observable<Incident>) {
        result.subscribe((res: Incident) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Incident) {
        this.eventManager.broadcast({ name: 'incidentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }

    trackDepartmentById(index: number, item: Department) {
        return item.id;
    }

    trackIncidentTypeById(index: number, item: IncidentType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-incident-popup',
    template: ''
})
export class IncidentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private incidentPopupService: IncidentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.incidentPopupService
                    .open(IncidentDialogComponent as Component, params['id']);
            } else {
                this.incidentPopupService
                    .open(IncidentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
