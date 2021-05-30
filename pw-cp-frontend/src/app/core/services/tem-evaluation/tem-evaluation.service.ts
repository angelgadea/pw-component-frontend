import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// microservice
import { IPBackend } from '../../../microservices/ip-development';
import { componentRate } from '../../../microservices/components-backend';
import { endPointQuotationTemEvaluation, endpointNewQuotationLifeCycle } from '../../../microservices/endpoints';
import { endPointQuotationTemEvaluationSustentation } from '../../../microservices/endpoints';

// interface
import { TemEvaluation, DataTemEvaluation } from '../../models/tem-evaluation-model';
import { TemEvaluationSustentation } from '../../models/tem-evaluation-model';
import { DataUser } from '../../models/login-model';
import { approverLevel } from '../../../config/configuration-file';

@Injectable({
  providedIn: 'root'
})
export class TemEvaluationService {

  API_URL_QUOTATIONTEMEVALUATION = `${IPBackend}${componentRate}${endPointQuotationTemEvaluation}`;
  API_URL_QUOTATIONTEMEVALUATIONSUSTENTATION = `${IPBackend}${componentRate}${endPointQuotationTemEvaluationSustentation}`;
  API_URL_NEWQUOTATIONLIFECYCLE = `${IPBackend}${componentRate}${endpointNewQuotationLifeCycle}`;

  public dataTemEvaluation: Observable<any>;
  public dataTemEvaluationSustentation: Observable<any>;
  public responseLifeCycle: Observable<any>;

  constructor(private http: HttpClient) {
  }

  getTemEvaluation(quotationId: any, dataOfUser: DataUser) {
    const id = quotationId;
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username);
    return this.dataTemEvaluation = this.http.get<TemEvaluation>(`${this.API_URL_QUOTATIONTEMEVALUATION}${id}`, {headers});
  }

  getTemEvaluationSustentation(quotationId: any, dataOfUser: DataUser)  {
    const id = quotationId;
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username);
    return this.dataTemEvaluationSustentation =
    this.http.get<TemEvaluationSustentation[]>(`${this.API_URL_QUOTATIONTEMEVALUATIONSUSTENTATION}${id}`, {headers});
  }

  postNewQuotationLifeCycle(dataTem: TemEvaluation, dataTemForm: DataTemEvaluation, dataOfUser: DataUser) {
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username)
    .set('Content-Type', 'application/json');
    const body = {
      userId: dataOfUser.id,
      quotationId: dataTem.quotationId,
      statusId: dataTemForm.statusId,
      approvalLevel: dataTemForm.approvalLevel,
      immediateBoss: dataTemForm.inmediateBoss,
      comment: dataTemForm.commentTemEvaluation,
      quotedRate: dataTem.quoted_rate,
      requestedRate: dataTemForm.requestRate,
      approvedRate: dataTemForm.approveRate,
      creatorUser: dataOfUser.username
    };
    return this.responseLifeCycle = this.http.post(this.API_URL_NEWQUOTATIONLIFECYCLE, body, {headers});
  }

  postNewQuotationLifeCycleDownloadPDF(data: any, dataOfUser: DataUser) {
    const statId = data.statusId === 2  ? 6 : 7;
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username)
    .set('Content-Type', 'application/json');
    const body = {
      userId: dataOfUser.id,
      quotationId: data.quotationId,
      statusId: statId,
      approvalLevel: null,
      immediateBoss: null,
      comment: null,
      quotedRate: data.quotedRate,
      requestedRate: data.requestedRate,
      approvedRate: data.approvedRate,
      creatorUser: data.responsableName
    };   
    return this.responseLifeCycle = this.http.post(this.API_URL_NEWQUOTATIONLIFECYCLE, body, {headers});
  }

}
