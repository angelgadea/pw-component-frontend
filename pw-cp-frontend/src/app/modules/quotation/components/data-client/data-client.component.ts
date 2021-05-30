import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


// interface
import {
  DataDocumentType,
  DataClient
} from '@core/models/data-client-model';
// services
import { DataClientService } from '@core/services/quotation/data-client.service';
import { DataProductService } from '@core/services/quotation/data-product.service';
import { DataLoanService } from '@core/services/quotation/data-loan.service';
import { DataRateService } from '@core/services/quotation/data-rate.service';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
// file-configuration
import { statusCode, document} from '../../../../config/configuration-file';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-data-client',
  templateUrl: './data-client.component.html',
  styleUrls: ['./data-client.component.css']
})
export class DataClientComponent implements OnInit, OnDestroy {

  @ViewChild('score', {static: true}) score: ElementRef;
  @ViewChild('numberOfDoc', {static: true}) numberOfDoc: ElementRef; 

  private unsubscribe$ = new Subject();
  public objDocumentType: DataDocumentType[] = [];
  public dataClient: DataClient = {
    clientBank: '',
    documentId: 1,
    numberOfDocument: '',
    documentName: 'DNI',
    commercialProfileId: 0,
    creationDate: '',
    id: 0,
    linkage: '',
    fullName: '',
    segmentId: 0,
    segmentName: '',
    score: '',
    amount: 0,
    rate: 0,
    customerCode: '',
    comercialProfileEmpresarioId: 0,
    comercialProfileSuperFacilId: 0, 
  };
  public disabledBtnSearch: boolean;
  public disabledClient: boolean;
  public clientOfBank: string;
  public dataOfUser: any;
  public disabledProduct: boolean;
  public disabledDocumentType: boolean;
  public disabledInputNumberDocument: boolean;
  public typeInput: boolean;
  public errorNumberValidation: boolean;
  public loadingClient: boolean;

  constructor(private dataClientService: DataClientService,
              private dataProductService: DataProductService,
              private dataLoanService: DataLoanService,
              private dataRateService: DataRateService,
              private quoterQuotationViewService: QuoterQuotationViewService,
              private route: Router) {
    this.readDataOfSessionStorage();
    this.disabledBtnSearch = true;
    this.disabledClient = true;
    this.disabledProduct = true;
    this.disabledDocumentType = true;
    this.disabledInputNumberDocument = true;
    this.typeInput = true;
    this.loadingClient = false;
  }

  ngOnInit() {
    this.subscribeDocumentType();
    this.subscribeDataClientReset();
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  subscribeDocumentType() {
    this.dataClientService.getDocumentType(this.dataOfUser)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((result: any) => {
       this.objDocumentType = result;       
    }, (error) => {
      this.handleError(error);
    });
  }

  subscribeDataClientReset() {
   this.dataClientService.reset.subscribe(result => {
      this.resetClient();
      this.disabledClient = result;
      this.disabledBtnSearch = true;
      this.clientOfBank = '';
      this.disabledDocumentType = true;
      this.disabledInputNumberDocument = true;
      this.typeInput = false;
    });
  }

  resetSelectScore() {
    this.score.nativeElement.value = '';
  }

  onDocumentType(documentId: number) {
    const documentType = this.dataClient.documentId = Number(documentId);
    if (documentType === document.dni) {
      this.typeInput = false;
      this.dataClient.numberOfDocument = '';
      this.disabledBtnSearch = true;
      this.errorNumberValidation = false;
    } else if (documentType === document.ruc) {
      this.typeInput = false;
      this.dataClient.numberOfDocument = '';
      this.disabledBtnSearch = true;
      this.errorNumberValidation = false;
    } else if (documentType === document.pasaporte) {
      this.typeInput = false;
      this.dataClient.numberOfDocument = '';
      this.disabledBtnSearch = true;
      this.errorNumberValidation = false;
    } else if (documentType === document.carnetDeExtranjeria) {
      this.typeInput = false;
      this.dataClient.numberOfDocument = '';
      this.disabledBtnSearch = true;
      this.errorNumberValidation = false;
    }
  }

  onDocumentNumber() {
    const documentType = Number(this.dataClient.documentId);
    const documentNum = this.dataClient.numberOfDocument;
    const regexDni = /(^[0-9]{8}$)/g;
    const documentValiDni = regexDni.test(documentNum);
    const regexRuc = /^[0-9]{11,11}$/g;
    const regexPasC = /^[a-zA-Z0-9]+$/g;
    const documentValiRuc = regexRuc.test(documentNum);
    const documentValiPasC = regexPasC.test(documentNum);
    if (documentType === document.pasaporte && this.dataClient.numberOfDocument.length > 2 && this.dataClient.numberOfDocument.length <= 20
      && documentValiPasC === true) {
      this.disabledBtnSearch = false;
      this.errorNumberValidation = false;
    } else if (documentType === document.dni && this.dataClient.numberOfDocument.length === 8 && documentValiDni === true) {
      this.disabledBtnSearch = false;
      this.errorNumberValidation = false;
    } else if (documentType === document.ruc && this.dataClient.numberOfDocument.length === 11 && documentValiRuc === true) {
      this.disabledBtnSearch = false;
      this.errorNumberValidation = false;
    } else if (documentType === document.carnetDeExtranjeria && this.dataClient.numberOfDocument.length === 12 && documentValiPasC === true) {
      this.disabledBtnSearch = false;
      this.errorNumberValidation = false;
    } else if (this.dataClient.numberOfDocument === '') {
      this.disabledBtnSearch = true;
      this.errorNumberValidation = false;
    } else {
      this.disabledBtnSearch = true;
      this.errorNumberValidation = true;
    }
  }

  onSearchDataClient() {
    const dataDocument = {
      ...this.dataClient,
      documentId: this.dataClient.documentId,
      numberOfDocument: this.dataClient.numberOfDocument
    };
    this.disabledDocumentType = false;
    this.disabledInputNumberDocument = false;
    this.dataClientService.getDataClient(dataDocument, this.dataOfUser);
    this.subscribeDataCustomer();
  }

  subscribeDataCustomer() {
    this.loadingClient = true;
    this.dataClientService.dataClients
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {      
      this.loadingClient = false;
      if (result.newCustomer === 0) {
        const dataClient = {
          ...this.dataClient,
          customerCode: result.customerCode,
          documentCode: result.documentCode,
          documentType: result.documentType,
          id: result.id,
          linkage: result.newCustomer,
          fullName: result.fullName,
          score: result.riskLevel,
          segmentId: result.segmentId,
          segmentName: result.segmentName,
          rate: result.rate,
          amount: result.amount,
          comercialProfileEmpresarioId: result.comercialProfileEmpresarioId,
          comercialProfileSuperFacilId: result.comercialProfileSuperFacilId,
        };
        this.dataClient = dataClient;
        this.disabledClient = false;
        this.dataClient.clientBank = 'client';
        this.clientOfBank = 'client';
        this.disabledProduct = false;
        this.dataProductService.activeProduct.next(this.disabledProduct);
        this.dataLoanService.addDataClient(this.dataClient);
        this.dataRateService.addDataClient(this.dataClient);       
      } else if (result.newCustomer === 1 || result.newCustomer === null) {
        const dataNoClient = {
          ...this.dataClient,
          customerCode: result.customerCode,
          creationDate: result.creationDate,
          documentCode: this.dataClient.numberOfDocument,
          documentType: result.documentType,
          id: result.id,
          linkage: result.newCustomer,
          fullName: result.fullName,
          segmentId: result.segmentId,
          segmentName: result.segmentName,
          comercialProfileEmpresarioId: result.comercialProfileEmpresarioId,
          comercialProfileSuperFacilId: result.comercialProfileSuperFacilId
        };
        this.dataClient = dataNoClient;     
        console.log('no client',this.dataClient);   
        this.disabledClient = false;
        this.clientOfBank = 'noClient';
        this.dataLoanService.addDataClient(this.dataClient);
        this.dataRateService.addDataClient(this.dataClient); 
        this.disabledContentProduct();
        }
      }, (error) => {
        this.loadingClient = false;
        this.handleError(error);
      });
  }

  setNameClient() {
    if (this.dataClient.fullName !== '' && this.dataClient.fullName !== null && this.dataClient.score !== '') {
      this.disabledProduct = false;
      this.disabledContentProduct();
    } else {
      this.disabledProduct = true;
      this.disabledContentProduct();
    }
  }

  onSelectScore(score: string) {
    this.dataClient.score = score;
    if (this.dataClient.fullName !== '' && this.dataClient.fullName !== null && this.dataClient.score !== '') {
      this.disabledProduct = false;
      this.disabledContentProduct();
    } else {
      this.disabledProduct = true;
      this.disabledContentProduct();
    }
    this.dataLoanService.addDataClient(this.dataClient);
    this.dataRateService.addDataClient(this.dataClient);
    this.quoterQuotationViewService.addDataClientOfView(this.dataClient);
  }

  disabledContentProduct() {
    if (this.dataClient.fullName !== '' && this.dataClient.fullName !== null && this.dataClient.score !== '') {
      this.disabledProduct = false;
      this.dataProductService.activeProduct.next(this.disabledProduct);
    } else {
      this.disabledProduct = true;
      this.dataProductService.activeProduct.next(this.disabledProduct);
    }
  }

  resetClient() {
    this.dataClient.clientBank = '';
    this.dataClient.documentId = 1;
    this.dataClient.numberOfDocument = '';
    this.dataClient.commercialProfileId = 0;
    this.dataClient.id = 0;
    this.dataClient.linkage = '';
    this.dataClient.fullName = '';
    this.dataClient.segmentId = 0;
    this.dataClient.segmentName = '';
    this.dataClient.score = '';
    this.dataClient.amount = 0;
    this.dataClient.rate = 0;
  }

  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }
  cleanNumDoc() {
    this.dataClient.numberOfDocument = '';
    this.disabledDocumentType = true;
    this.disabledInputNumberDocument = true;
    this.disabledBtnSearch = true;
  }
 
}






