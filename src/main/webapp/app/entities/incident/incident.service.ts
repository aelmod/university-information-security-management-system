import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Incident } from './incident.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IncidentService {

    private resourceUrl = SERVER_API_URL + 'api/incidents';

    constructor(private http: Http) { }

    create(incident: Incident): Observable<Incident> {
        const copy = this.convert(incident);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(incident: Incident): Observable<Incident> {
        const copy = this.convert(incident);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Incident> {
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
     * Convert a returned JSON object to Incident.
     */
    private convertItemFromServer(json: any): Incident {
        const entity: Incident = Object.assign(new Incident(), json);
        return entity;
    }

    /**
     * Convert a Incident to a JSON which can be sent to the server.
     */
    private convert(incident: Incident): Incident {
        const copy: Incident = Object.assign({}, incident);
        return copy;
    }
}
