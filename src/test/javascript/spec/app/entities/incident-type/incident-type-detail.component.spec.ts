/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterTestModule } from '../../../test.module';
import { IncidentTypeDetailComponent } from '../../../../../../main/webapp/app/entities/incident-type/incident-type-detail.component';
import { IncidentTypeService } from '../../../../../../main/webapp/app/entities/incident-type/incident-type.service';
import { IncidentType } from '../../../../../../main/webapp/app/entities/incident-type/incident-type.model';

describe('Component Tests', () => {

    describe('IncidentType Management Detail Component', () => {
        let comp: IncidentTypeDetailComponent;
        let fixture: ComponentFixture<IncidentTypeDetailComponent>;
        let service: IncidentTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [IncidentTypeDetailComponent],
                providers: [
                    IncidentTypeService
                ]
            })
            .overrideTemplate(IncidentTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncidentTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncidentTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new IncidentType(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.incidentType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
