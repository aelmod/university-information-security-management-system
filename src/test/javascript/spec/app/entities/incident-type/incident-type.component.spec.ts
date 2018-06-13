/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterTestModule } from '../../../test.module';
import { IncidentTypeComponent } from '../../../../../../main/webapp/app/entities/incident-type/incident-type.component';
import { IncidentTypeService } from '../../../../../../main/webapp/app/entities/incident-type/incident-type.service';
import { IncidentType } from '../../../../../../main/webapp/app/entities/incident-type/incident-type.model';

describe('Component Tests', () => {

    describe('IncidentType Management Component', () => {
        let comp: IncidentTypeComponent;
        let fixture: ComponentFixture<IncidentTypeComponent>;
        let service: IncidentTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [IncidentTypeComponent],
                providers: [
                    IncidentTypeService
                ]
            })
            .overrideTemplate(IncidentTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncidentTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncidentTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new IncidentType(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.incidentTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
