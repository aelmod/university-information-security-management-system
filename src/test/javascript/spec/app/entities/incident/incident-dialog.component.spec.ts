/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { IncidentDialogComponent } from '../../../../../../main/webapp/app/entities/incident/incident-dialog.component';
import { IncidentService } from '../../../../../../main/webapp/app/entities/incident/incident.service';
import { Incident } from '../../../../../../main/webapp/app/entities/incident/incident.model';
import { EmployeeService } from '../../../../../../main/webapp/app/entities/employee';
import { DepartmentService } from '../../../../../../main/webapp/app/entities/department';
import { IncidentTypeService } from '../../../../../../main/webapp/app/entities/incident-type';

describe('Component Tests', () => {

    describe('Incident Management Dialog Component', () => {
        let comp: IncidentDialogComponent;
        let fixture: ComponentFixture<IncidentDialogComponent>;
        let service: IncidentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [IncidentDialogComponent],
                providers: [
                    EmployeeService,
                    DepartmentService,
                    IncidentTypeService,
                    IncidentService
                ]
            })
            .overrideTemplate(IncidentDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncidentDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncidentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Incident(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.incident = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'incidentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Incident();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.incident = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'incidentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
