/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterTestModule } from '../../../test.module';
import { IncidentDetailComponent } from '../../../../../../main/webapp/app/entities/incident/incident-detail.component';
import { IncidentService } from '../../../../../../main/webapp/app/entities/incident/incident.service';
import { Incident } from '../../../../../../main/webapp/app/entities/incident/incident.model';

describe('Component Tests', () => {

    describe('Incident Management Detail Component', () => {
        let comp: IncidentDetailComponent;
        let fixture: ComponentFixture<IncidentDetailComponent>;
        let service: IncidentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [IncidentDetailComponent],
                providers: [
                    IncidentService
                ]
            })
            .overrideTemplate(IncidentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncidentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncidentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Incident(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.incident).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
