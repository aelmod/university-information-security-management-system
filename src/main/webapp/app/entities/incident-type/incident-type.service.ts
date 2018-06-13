import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { IncidentType } from './incident-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IncidentTypeService {

    private resourceUrl = SERVER_API_URL + 'api/incident-types';

    constructor(private http: Http) { }

    create(incidentType: IncidentType): Observable<IncidentType> {
        const copy = this.convert(incidentType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(incidentType: IncidentType): Observable<IncidentType> {
        const copy = this.convert(incidentType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<IncidentType> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to IncidentType.
     */
    private convertItemFromServer(json: any): IncidentType {
        const entity: IncidentType = Object.assign(new IncidentType(), json);
        return entity;
    }

    /**
     * Convert a IncidentType to a JSON which can be sent to the server.
     */
    private convert(incidentType: IncidentType): IncidentType {
        const copy: IncidentType = Object.assign({}, incidentType);
        return copy;
    }
}
