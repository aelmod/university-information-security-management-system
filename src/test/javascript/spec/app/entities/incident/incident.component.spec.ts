/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterTestModule } from '../../../test.module';
import { IncidentComponent } from '../../../../../../main/webapp/app/entities/incident/incident.component';
import { IncidentService } from '../../../../../../main/webapp/app/entities/incident/incident.service';
import { Incident } from '../../../../../../main/webapp/app/entities/incident/incident.model';

describe('Component Tests', () => {

    describe('Incident Management Component', () => {
        let comp: IncidentComponent;
        let fixture: ComponentFixture<IncidentComponent>;
        let service: IncidentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [IncidentComponent],
                providers: [
                    IncidentService
                ]
            })
            .overrideTemplate(IncidentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncidentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncidentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Incident(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.incidents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
