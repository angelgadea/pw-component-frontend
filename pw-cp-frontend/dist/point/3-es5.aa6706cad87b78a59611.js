function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{w69p:function(t,e,n){"use strict";n.r(e);var i,a=n("fXoL"),o=n("ofXK"),c=n("3Pt+"),r=n("tk/3"),s=n("PCNd"),l=n("tyNb"),u=n("mrSG"),f=n("XNiG"),d=n("1G5W"),b=n("xk4g"),p=n("smev"),g=n("+T8B"),m=n("iVvC"),h=((i=function(){function t(e){_classCallCheck(this,t),this.http=e,this.API_URL_QUOTATIONINBOX="".concat(p.a).concat(g.d).concat(m.p)}return _createClass(t,[{key:"getQuotationInbox",value:function(t,e){var n=t,i=e.id,a=(new r.c).set("userLoggedIn",e.username);return this.http.get("".concat(this.API_URL_QUOTATIONINBOX).concat(n,"/").concat(i),{headers:a})}}]),t}()).ngInjectableDef=a.Kb({token:i,factory:function(t){return new(t||i)(a.Wb(r.a))},providedIn:"root"}),i),v=n("JlSw"),_=n("38X0"),O=n("0IVe"),x=n("rOmX"),C=[1,"container-search"],w=[1,"d-flex"],y=[1,"col-2","col-lg-2","d-lg-none","d-flex","align-items-center","justify-content-center"],I=["type","button",1,"btn","container-search__btn",3,"click"],P=["src","assets/icons/refresh_button.png","alt","refresh-button",1,"img-inbox"],A=[1,"col-lg-10","col-7"],S=["src","assets/icons/search-quotation.png","alt","user",1,"container-search__img","d-none","d-lg-block"],Q=["type","text","placeholder","Buscar aqu\xed",1,"container-search__input",3,"ngModel","ngModelChange"],q=[1,"col-3","col-lg-2","container-filter-img","d-flex","align-items-center","justify-content-center"],k=[1,"col-5","d-flex","justify-content-center"],M=["type","button ",1,"btn",3,"click"],D=["src","assets/icons/check_box_approver.png ",1,"container-filter-img__img","d-block"],R=["type","button ",1,"btn","d-block",3,"click"],U=["src","assets/icons/arrow-down2.png ",1,"container-filter-img__show-state"],N=["class","animated container-filter",4,"ngIf"],B=[1,"content-main-section","animated"],j=["class","lds-default ",4,"ngIf"],T=["class","alert alert-secondary pl-5 ","role","alert ",4,"ngIf"],z=["class","animated",4,"ngFor","ngForOf"],$=["class","content-btn-view-more ",4,"ngIf"],E=[1,"animated","container-filter"],H=[1,"main-list-quotes__div"],Z=["type","button","value","2",1,"btn","container-filter_status-quotation",3,"click"],F=["valueApprover",""],L=["class","main-list-quotes__div",4,"ngIf"],Y=["type","button","value","4",1,"btn","container-filter_status-quotation",3,"click"],V=["valueReject",""],X=[1,"mt-3"],G=["type","button",1,"btn","container-filter__btn",3,"click"],J=["type","button","value","1",1,"btn","container-filter_status-quotation",3,"click"],W=["valuePENAPAS",""];function K(t,e){if(1&t){var n=a.Tb();a.Sb(0,"div",H),a.Sb(1,"button",J,W),a.Yb("click",(function(t){a.oc(n);var e=a.mc(2);return a.bc(2).selectApprover(e.value)})),a.xc(3,"Pendiente de Aprobaci\xf3n"),a.Qb(),a.Qb()}}var tt=["valuePA",""],et=[1,"rounded-circle","mt-2","align-self-start","main-list-quotes__circle","main-list-quotes__circle--statepenap"];function nt(t,e){if(1&t){var n=a.Tb();a.Sb(0,"div",H),a.Sb(1,"button",J,tt),a.Yb("click",(function(t){a.oc(n);var e=a.mc(2);return a.bc(2).selectApprover(e.value)})),a.xc(3,"Pendiente de Aprobaci\xf3n"),a.Qb(),a.Pb(4,"span",et),a.Qb()}}var it=["type","button","value","5",1,"btn","container-filter_status-quotation",3,"click"],at=["valuePAMOD",""],ot=[1,"rounded-circle","mt-2","align-self-start","main-list-quotes__circle","main-list-quotes__circle--stateFinish"];function ct(t,e){if(1&t){var n=a.Tb();a.Sb(0,"div",H),a.Sb(1,"button",it,at),a.Yb("click",(function(t){a.oc(n);var e=a.mc(2);return a.bc(2).selectApprover(e.value)})),a.xc(3,"Pendiente de Aprobaci\xf3n"),a.Qb(),a.Pb(4,"span",ot),a.Qb()}}function rt(t,e){if(1&t){var n=a.Tb();a.Sb(0,"div",E),a.Sb(1,"div",H),a.Sb(2,"button",Z,F),a.Yb("click",(function(t){a.oc(n);var e=a.mc(3);return a.bc().selectApprover(e.value)})),a.xc(4,"Aprobado"),a.Qb(),a.Qb(),a.wc(5,K,4,0,"div",L),a.wc(6,nt,5,0,"div",L),a.wc(7,ct,5,0,"div",L),a.Sb(8,"div",H),a.Sb(9,"button",Y,V),a.Yb("click",(function(t){a.oc(n);var e=a.mc(10);return a.bc().selectApprover(e.value)})),a.xc(11,"Rechazado"),a.Qb(),a.Qb(),a.Sb(12,"div",X),a.Sb(13,"button",G),a.Yb("click",(function(t){return a.oc(n),a.bc().filterState()})),a.xc(14,"Aplicar"),a.Qb(),a.Qb(),a.Qb()}if(2&t){var i=a.bc();a.qc(5),a.fc("ngIf","COTIZADOR"===i.dataOfUser.roleName),a.qc(6),a.fc("ngIf","APROBADOR"===i.dataOfUser.roleName),a.qc(7),a.fc("ngIf","APROBADOR"===i.dataOfUser.roleName)}}var st=[1,"lds-default"];function lt(t,e){1&t&&(a.Sb(0,"div",st),a.Pb(1,"div"),a.Pb(2,"div"),a.Pb(3,"div"),a.Pb(4,"div"),a.Pb(5,"div"),a.Pb(6,"div"),a.Pb(7,"div"),a.Pb(8,"div"),a.Pb(9,"div"),a.Pb(10,"div"),a.Pb(11,"div"),a.Pb(12,"div"),a.Qb())}var ut=["role","alert ",1,"alert","alert-secondary","pl-5"];function ft(t,e){1&t&&(a.Sb(0,"div",ut),a.xc(1," No se encontraron cotizaciones. "),a.Qb())}var dt=[1,"animated"],bt=["class","container-quotation my-2 mx-lg-3 d-flex align-items-center",4,"ngIf"],pt=["class","main-section__state mx-3 mt-2 mb-2 ",3,"ngStyle",4,"ngIf"],gt=[1,"container-quotation","my-2","mx-lg-3","d-flex","align-items-center"],mt=["type"," button ",1,"btn","position-relative","d-flex","align-items-center","container-quotation__btn-status",3,"click"],ht=[1,"d-flex","align-items-center","justify-content-lg-around"],vt=["class","rounded-circle main-section__letter ",3,"ngStyle",4,"ngIf"],_t=["class","rounded-circle ",3,"ngStyle",4,"ngIf"],Ot=["class","rounded-circle main-section__letter background-climb ",3,"ngStyle",4,"ngIf"],xt=["class","rounded-circle main-section__circle ",4,"ngIf"],Ct=["class","rounded-circle main-section__circle--modified ",4,"ngIf"],wt=["type","button ",1,"col-10","pl-2","pl-lg-0","btn",3,"click"],yt=[1,"main-section__inf-client"],It=[1,"main-section__date"],Pt=[1,"main-section__inf-client--name"],At=[1,"d-lg-flex"],St=[1,"m-0"],Qt=["class","d-inline-block main-section__text",4,"ngIf"],qt=[1,"d-inline-block","main-section__text"],kt=[1,"px-1","d-inline-block"],Mt=[1,"mr-2","main-section__text"],Dt=[1,"main-section__text"],Rt=[1,"rounded-circle","main-section__letter",3,"ngStyle"],Ut=function(t){return{background:t}};function Nt(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit,i=a.bc();a.fc("ngStyle",a.jc(2,Ut,"COTIZADOR"===i.dataOfUser.roleName&&7===n.statusId?"#C0C0C0":"#687BC6;")),a.qc(1),a.zc("",n.statusAbbreviation," ")}}function Bt(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit,i=a.bc();a.fc("ngStyle",a.jc(2,Ut,"COTIZADOR"===i.dataOfUser.roleName&&6===n.statusId?"#C0C0C0":"#687BC6;")),a.qc(1),a.zc("",n.statusAbbreviation," ")}}function jt(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit,i=a.bc();a.fc("ngStyle",a.jc(2,Ut,"COTIZADOR"===i.dataOfUser.roleName&&5===n.statusId?"#687BC6":"#C0C0C0")),a.qc(1),a.zc("",n.statusAbbreviation," ")}}function Tt(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit,i=a.bc();a.fc("ngStyle",a.jc(2,Ut,"COTIZADOR"===i.dataOfUser.roleName&&4===n.statusId?"#687BC6":"#C0C0C0")),a.qc(1),a.zc("",n.statusAbbreviation," ")}}function zt(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit,i=a.bc();a.fc("ngStyle",a.jc(2,Ut,"COTIZADOR"===i.dataOfUser.roleName&&3===n.statusId?"#687BC6":"#C0C0C0")),a.qc(1),a.zc("",n.statusAbbreviation," ")}}function $t(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit,i=a.bc();a.fc("ngStyle",a.jc(2,Ut,"COTIZADOR"===i.dataOfUser.roleName&&2===n.statusId?"#687BC6":"#C0C0C0")),a.qc(1),a.zc("",n.statusAbbreviation," ")}}function Et(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit,i=a.bc();a.fc("ngStyle",a.jc(2,Ut,"COTIZADOR"===i.dataOfUser.roleName&&1===n.statusId?"#687BC6":"#C0C0C0")),a.qc(1),a.zc("",n.statusAbbreviation," ")}}function Ht(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit;a.fc("ngStyle",a.jc(2,Ut,1===n.statusId?"#EA9129":"#C0C0C0")),a.qc(1),a.yc(n.statusAbbreviation)}}function Zt(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit;a.fc("ngStyle",a.jc(2,Ut,2===n.statusId?"#687BC6":"#C0C0C0")),a.qc(1),a.yc(n.statusAbbreviation)}}function Ft(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit;a.fc("ngStyle",a.jc(2,Ut,3===n.statusId?"#687BC6":"#C0C0C0")),a.qc(1),a.yc(n.statusAbbreviation)}}function Lt(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit;a.fc("ngStyle",a.jc(2,Ut,4===n.statusId?"#687BC6":"#C0C0C0;")),a.qc(1),a.yc(n.statusAbbreviation)}}var Yt=[1,"rounded-circle",3,"ngStyle"];function Vt(t,e){if(1&t&&(a.Sb(0,"span",Yt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit;a.fc("ngStyle",a.jc(2,Ut,5===n.statusId?"#687BC6":"#C0C0C0")),a.qc(1),a.yc(n.statusAbbreviation)}}function Xt(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit;a.fc("ngStyle",a.jc(2,Ut,6===n.statusId?"#C0C0C0":"#687BC6;")),a.qc(1),a.yc(n.statusAbbreviation)}}function Gt(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit;a.fc("ngStyle",a.jc(2,Ut,7===n.statusId?"#C0C0C0":"#687BC6;")),a.qc(1),a.yc(n.statusAbbreviation)}}var Jt=[1,"rounded-circle","main-section__letter","background-climb",3,"ngStyle"];function Wt(t,e){if(1&t&&(a.Sb(0,"span",Jt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit,i=a.bc();a.fc("ngStyle",a.jc(2,Ut,n.currentApproverId===i.dataOfUser.id&&"PA"===n.statusAbbreviation?"#EA9129":"#687BC6;")),a.qc(1),a.yc(n.statusAbbreviation)}}var Kt=[1,"rounded-circle","main-section__circle"];function te(t,e){1&t&&a.Pb(0,"span",Kt)}var ee=[1,"rounded-circle","main-section__circle--modified"];function ne(t,e){1&t&&a.Pb(0,"span",ee)}var ie=[1,"px-1"];function ae(t,e){if(1&t&&(a.Sb(0,"span",qt),a.xc(1),a.Sb(2,"span",ie),a.xc(3,"/"),a.Qb(),a.Qb()),2&t){var n=a.bc(2).$implicit;a.qc(1),a.zc("DNI: ",n.identifierCode,"")}}function oe(t,e){if(1&t&&(a.Sb(0,"span",qt),a.xc(1),a.Sb(2,"span",ie),a.xc(3,"/"),a.Qb(),a.Qb()),2&t){var n=a.bc(2).$implicit;a.qc(1),a.zc("RUC: ",n.identifierCode,"")}}function ce(t,e){if(1&t&&(a.Sb(0,"span",qt),a.xc(1),a.Sb(2,"span",ie),a.xc(3,"/"),a.Qb(),a.Qb()),2&t){var n=a.bc(2).$implicit;a.qc(1),a.zc("PAS: ",n.identifierCode,"")}}function re(t,e){if(1&t&&(a.Sb(0,"span",qt),a.xc(1),a.Sb(2,"span",ie),a.xc(3,"/"),a.Qb(),a.Qb()),2&t){var n=a.bc(2).$implicit;a.qc(1),a.zc("CE: ",n.identifierCode,"")}}var se=[1,"d-none","d-lg-inline-block"];function le(t,e){1&t&&(a.Sb(0,"span",qt),a.xc(1,"Empresario "),a.Sb(2,"span",se),a.xc(3," \xa0/\xa0 "),a.Qb(),a.Qb())}function ue(t,e){1&t&&(a.Sb(0,"span",qt),a.xc(1,"Super f\xe1cil "),a.Sb(2,"span",se),a.xc(3," \xa0/\xa0 "),a.Qb(),a.Qb())}function fe(t,e){if(1&t){var n=a.Tb();a.Sb(0,"div",gt),a.Sb(1,"button",mt),a.Yb("click",(function(t){a.oc(n);var e=a.bc().$implicit;return a.bc().viewQuote(e.quotationId)})),a.Sb(2,"div",ht),a.wc(3,Nt,2,4,"span",vt),a.wc(4,Bt,2,4,"span",vt),a.wc(5,jt,2,4,"span",vt),a.wc(6,Tt,2,4,"span",vt),a.wc(7,zt,2,4,"span",vt),a.wc(8,$t,2,4,"span",vt),a.wc(9,Et,2,4,"span",vt),a.wc(10,Ht,2,4,"span",vt),a.wc(11,Zt,2,4,"span",vt),a.wc(12,Ft,2,4,"span",vt),a.wc(13,Lt,2,4,"span",vt),a.wc(14,Vt,2,4,"span",_t),a.wc(15,Xt,2,4,"span",vt),a.wc(16,Gt,2,4,"span",vt),a.wc(17,Wt,2,4,"span",Ot),a.Qb(),a.wc(18,te,1,0,"span",xt),a.wc(19,ne,1,0,"span",Ct),a.Qb(),a.Sb(20,"button",wt),a.Yb("click",(function(t){a.oc(n);var e=a.bc().$implicit;return a.bc().viewQuotation(e.quotationId,e.statusId,e.currentApproverId,e.statusAbbreviation)})),a.Sb(21,"div",yt),a.Sb(22,"p",It),a.xc(23),a.cc(24,"date"),a.Qb(),a.Sb(25,"p",Pt),a.xc(26),a.Qb(),a.Sb(27,"div",At),a.Sb(28,"div",St),a.wc(29,ae,4,1,"span",Qt),a.wc(30,oe,4,1,"span",Qt),a.wc(31,ce,4,1,"span",Qt),a.wc(32,re,4,1,"span",Qt),a.Sb(33,"span",qt),a.xc(34),a.Qb(),a.Sb(35,"span",kt),a.xc(36,"/"),a.Qb(),a.wc(37,le,4,0,"span",Qt),a.wc(38,ue,4,0,"span",Qt),a.Qb(),a.Sb(39,"p",St),a.Sb(40,"span",Mt),a.xc(41),a.cc(42,"customAmount"),a.Qb(),a.Sb(43,"span",Dt),a.xc(44),a.cc(45,"customAmount"),a.Qb(),a.Qb(),a.Qb(),a.Qb(),a.Qb(),a.Qb()}if(2&t){var i=a.bc().$implicit,o=a.bc();a.qc(3),a.fc("ngIf","COTIZADOR"===o.dataOfUser.roleName&&7===i.statusId),a.qc(4),a.fc("ngIf","COTIZADOR"===o.dataOfUser.roleName&&6===i.statusId),a.qc(5),a.fc("ngIf","COTIZADOR"===o.dataOfUser.roleName&&5===i.statusId),a.qc(6),a.fc("ngIf","COTIZADOR"===o.dataOfUser.roleName&&4===i.statusId),a.qc(7),a.fc("ngIf","COTIZADOR"===o.dataOfUser.roleName&&3===i.statusId),a.qc(8),a.fc("ngIf","COTIZADOR"===o.dataOfUser.roleName&&2===i.statusId),a.qc(9),a.fc("ngIf","COTIZADOR"===o.dataOfUser.roleName&&1===i.statusId),a.qc(10),a.fc("ngIf",null===i.currentApproverId&&"APROBADOR"===o.dataOfUser.roleName&&1===i.statusId),a.qc(11),a.fc("ngIf",null===i.currentApproverId&&"APROBADOR"===o.dataOfUser.roleName&&2===i.statusId),a.qc(12),a.fc("ngIf",null===i.currentApproverId&&"APROBADOR"===o.dataOfUser.roleName&&3===i.statusId),a.qc(13),a.fc("ngIf",null===i.currentApproverId&&"APROBADOR"===o.dataOfUser.roleName&&4===i.statusId),a.qc(14),a.fc("ngIf",null===i.currentApproverId&&"APROBADOR"===o.dataOfUser.roleName&&5===i.statusId),a.qc(15),a.fc("ngIf",null===i.currentApproverId&&"APROBADOR"===o.dataOfUser.roleName&&6===i.statusId),a.qc(16),a.fc("ngIf",null===i.currentApproverId&&"APROBADOR"===o.dataOfUser.roleName&&7===i.statusId),a.qc(17),a.fc("ngIf","APROBADOR"===o.dataOfUser.roleName&&null!==i.currentApproverId),a.qc(18),a.fc("ngIf",3===i.statusId),a.qc(19),a.fc("ngIf",7===i.statusId),a.qc(23),a.yc(a.ec(24,28,i.modificationDate,"mediumDate")),a.qc(26),a.yc(i.fullName),a.qc(29),a.fc("ngIf",1===i.documentType),a.qc(30),a.fc("ngIf",2===i.documentType),a.qc(31),a.fc("ngIf",3===i.documentType),a.qc(32),a.fc("ngIf",4===i.documentType),a.qc(34),a.zc("Score: ",i.riskLevel,""),a.qc(37),a.fc("ngIf",1===i.subproductId),a.qc(38),a.fc("ngIf",2===i.subproductId),a.qc(41),a.zc("TEMNGC: ",a.dc(42,31,i.quotedEar)," %"),a.qc(44),a.zc("TEMAPB: ",a.dc(45,33,i.approvedEar)," %")}}var de=[1,"main-section__state","mx-3","mt-2","mb-2",3,"ngStyle"],be=["type","button ",1,"d-flex","justify-content-start","align-items-center","p-0","btn","btn-content-state",3,"click"],pe=[1,"mx-auto","pr-4","main-section__state-description"],ge=["class","pl-2 ",4,"ngIf"];function me(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit,i=a.bc();a.fc("ngStyle",a.jc(2,Ut,"COTIZADOR"===i.dataOfUser.roleName&&6===n.statusId?"#C0C0C0":"#687BC6;")),a.qc(1),a.yc(n.statusAbbreviation)}}function he(t,e){if(1&t&&(a.Sb(0,"span",Rt),a.xc(1),a.Qb()),2&t){var n=a.bc(2).$implicit,i=a.bc();a.fc("ngStyle",a.jc(2,Ut,n.currentApproverId===i.dataOfUser.id&&"PA"===n.statusAbbreviation?"#EA9129":"#687BC6;")),a.qc(1),a.yc(n.statusAbbreviation)}}function ve(t,e){1&t&&a.Pb(0,"span",Kt)}var _e=[1,"pl-2"];function Oe(t,e){1&t&&(a.Sb(0,"p",_e),a.xc(1,"PENDIENTE DE APROBACI\xd3N"),a.Qb())}function xe(t,e){1&t&&(a.Sb(0,"p",_e),a.xc(1,"APROBADO"),a.Qb())}function Ce(t,e){1&t&&(a.Sb(0,"p",_e),a.xc(1,"APROBADO MODIFICADO"),a.Qb())}function we(t,e){1&t&&(a.Sb(0,"p",_e),a.xc(1,"RECHAZADO"),a.Qb())}function ye(t,e){1&t&&(a.Sb(0,"p",_e),a.xc(1,"PENDIENTE DE APROBACI\xd3N"),a.Qb())}function Ie(t,e){1&t&&(a.Sb(0,"p",_e),a.xc(1,"APROBADO"),a.Qb())}function Pe(t,e){1&t&&(a.Sb(0,"p",_e),a.xc(1,"APROBADO MODIFICADO"),a.Qb())}function Ae(t,e){if(1&t){var n=a.Tb();a.Sb(0,"div",de),a.Sb(1,"button",be),a.Yb("click",(function(t){a.oc(n);var e=a.bc().$implicit;return a.bc().viewQuoteStatus(e.quotationId)})),a.wc(2,me,2,4,"span",vt),a.wc(3,he,2,4,"span",vt),a.wc(4,ve,1,0,"span",xt),a.Sb(5,"span",pe),a.wc(6,Oe,2,0,"p",ge),a.wc(7,xe,2,0,"p",ge),a.wc(8,Ce,2,0,"p",ge),a.wc(9,we,2,0,"p",ge),a.wc(10,ye,2,0,"p",ge),a.wc(11,Ie,2,0,"p",ge),a.wc(12,Pe,2,0,"p",ge),a.Qb(),a.Qb(),a.Qb()}if(2&t){var i=a.bc().$implicit,o=a.bc();a.fc("ngStyle",a.jc(11,Ut,1===i.statusId&&"APROBADOR"===o.dataOfUser.roleName?"#EA9129":"#687BC6;")),a.qc(2),a.fc("ngIf","COTIZADOR"===o.dataOfUser.roleName),a.qc(3),a.fc("ngIf","APROBADOR"===o.dataOfUser.roleName),a.qc(4),a.fc("ngIf",3===i.statusId),a.qc(6),a.fc("ngIf",1===i.statusId),a.qc(7),a.fc("ngIf",2===i.statusId),a.qc(8),a.fc("ngIf",3===i.statusId),a.qc(9),a.fc("ngIf",4===i.statusId),a.qc(10),a.fc("ngIf",5===i.statusId),a.qc(11),a.fc("ngIf",6===i.statusId),a.qc(12),a.fc("ngIf",7===i.statusId)}}function Se(t,e){if(1&t&&(a.Sb(0,"div",dt),a.wc(1,fe,46,35,"div",bt),a.wc(2,Ae,13,13,"div",pt),a.Qb()),2&t){var n=e.$implicit,i=a.bc();a.qc(1),a.fc("ngIf",i.valueId!==n.quotationId),a.qc(2),a.fc("ngIf",i.valueId===n.quotationId)}}var Qe=[1,"content-btn-view-more"],qe=[1,"btn-view-more",3,"click"],ke=["src","assets/icons/plus.png ",1,"img-view-more"];function Me(t,e){if(1&t){var n=a.Tb();a.Sb(0,"div",Qe),a.Sb(1,"button",qe),a.Yb("click",(function(t){return a.oc(n),a.bc().countPageQuote()})),a.Pb(2,"img",ke),a.Qb(),a.Qb()}}var De=[1,"btn-view-more",3,"disabled","click"],Re=["src","assets/icons/plus_inactive.png ",1,"img-view-more"];function Ue(t,e){if(1&t){var n=a.Tb();a.Sb(0,"div",Qe),a.Sb(1,"button",De),a.Yb("click",(function(t){return a.oc(n),a.bc().countPageQuote()})),a.Pb(2,"img",Re),a.Qb(),a.Qb()}if(2&t){var i=a.bc();a.qc(1),a.fc("disabled",!!i.disabledBtnAddQuote)}}var Ne,Be,je=[{path:"",component:(Ne=function(){function t(e,n,i,a,o){_classCallCheck(this,t),this.route=e,this.quoterInboxService=n,this.temEvaluationService=i,this.quoterQuotationViewService=a,this.activeRoute=o,this.unsubscribe$=new f.a,this.page=1,this.newArray=[],this.readDataOfSessionStorage(),this.routeRoot=o.root,this.routerPathPage=this.routeRoot._routerState.snapshot.url,this.filterQuotes=!1}return _createClass(t,[{key:"ngOnInit",value:function(){this.viewQuotationInbox()}},{key:"ngOnDestroy",value:function(){return u.a(this,void 0,void 0,regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.unsubscribe$.next(),this.unsubscribe$.complete();case 1:case"end":return t.stop()}}),t,this)})))}},{key:"readDataOfSessionStorage",value:function(){return this.dataOfUser=JSON.parse(sessionStorage.getItem("dataUser"))}},{key:"viewQuoteStatus",value:function(t){this.valueId=0}},{key:"viewQuote",value:function(t){this.valueId=t}},{key:"viewQuotation",value:function(t,e,n,i){var a=String(t);"COTIZADOR"===this.dataOfUser.roleName?(this.quoterQuotationViewService.getQuoteSummary(a,this.dataOfUser),this.quoterQuotationViewService.getFilesOfServer(a,this.dataOfUser),this.route.navigate(["/quoter-quotation-view"])):"APROBADOR"===this.dataOfUser.roleName&&this.dataOfUser.id!==n&&i?(this.quoterQuotationViewService.getQuoteSummary(a,this.dataOfUser),this.route.navigate(["/quoter-quotation-view"])):"APROBADOR"===this.dataOfUser.roleName&&this.dataOfUser.id===n&&i&&3===e?(this.quoterQuotationViewService.getQuoteSummary(a,this.dataOfUser),this.route.navigate(["/quoter-quotation-view"])):"APROBADOR"===this.dataOfUser.roleName&&this.dataOfUser.id===n&&i&&2===e?(this.quoterQuotationViewService.getQuoteSummary(a,this.dataOfUser),this.route.navigate(["/quoter-quotation-view"])):"APROBADOR"===this.dataOfUser.roleName&&this.dataOfUser.id===n&&i?(this.temEvaluationService.getTemEvaluation(a,this.dataOfUser),this.temEvaluationService.getTemEvaluationSustentation(a,this.dataOfUser),this.route.navigate(["/tem-evaluation"])):"APROBADOR"!==this.dataOfUser.roleName||2!==e&&3!==e&&4!==e&&6!==e&&7!==e||(this.quoterQuotationViewService.getQuoteSummary(a,this.dataOfUser),this.route.navigate(["/quoter-quotation-view"]))}},{key:"countPageQuote",value:function(){this.page++,this.viewQuotationInbox()}},{key:"refreshQuote",value:function(){0===this.quotesLength?(this.newArray=[],this.page=1,this.viewQuotationInbox()):!0===this.disabledBtnAddQuote?(this.objDataQuotes=this.newArray,this.objDataFilters=this.newArray):(this.page=this.page+1,this.viewQuotationInbox())}},{key:"viewQuotationInbox",value:function(){var t=this;this.routerPathPage!==b.h.quoterInbox&&this.routerPathPage!==b.h.approverInbox||(this.loading=!0,this.quoterInboxService.getQuotationInbox(this.page,this.dataOfUser).pipe(Object(d.a)(this.unsubscribe$)).subscribe((function(e){if(0===e.length)t.disabledBtnAddQuote=!0,t.loading=!1;else{for(var n=0;n<e.length;n++)t.newArray.push(e[n]);t.objDataQuotes=t.newArray,t.objDataFilters=t.newArray,t.disabledBtnAddQuote=!1,t.searchQuotation="",t.loading=!1,t.quotesLength=t.newArray.length}}),(function(e){t.handleError(e),t.loading=!1})))}},{key:"validateStatusQuote",value:function(t){this.statusQuote=t.currentApproverId===this.dataOfUser.id&&"PA"===t.statusAbbreviation}},{key:"filterStateQuotes",value:function(){this.filterQuotes=!1===this.filterQuotes}},{key:"selectApprover",value:function(t){this.parameterValueFilter=t,console.log("desde selectAprover",this.parameterValueFilter)}},{key:"filterState",value:function(){this.applyFilter(this.parameterValueFilter,this.objDataFilters),this.filterQuotes=!1,console.log("filterState",this.parameterValueFilter,this.objDataFilters)}},{key:"applyFilter",value:function(t,e){var n=this;if("2"!==t||"APROBADOR"!==this.dataOfUser.roleName&&"COTIZADOR"!==this.dataOfUser.roleName){if("1"===t&&"COTIZADOR"===this.dataOfUser.roleName)this.objDataQuotes=e.filter((function(t){return 1===t.statusId||5===t.statusId})),this.quotesLength=this.objDataQuotes.length;else if("4"===t)this.objDataQuotes=e.filter((function(t){return 4===t.statusId})),this.quotesLength=this.objDataQuotes.length;else if("1"===t&&"APROBADOR"===this.dataOfUser.roleName){var i=e.filter((function(t){return n.dataOfUser.id===t.currentApproverId&&"PA"===t.statusAbbreviation}));this.objDataQuotes=i,this.quotesLength=this.objDataQuotes.length}else if("5"===t&&"APROBADOR"===this.dataOfUser.roleName){var a=e.filter((function(t){return n.dataOfUser.id!==t.currentApproverId&&"PA"===t.statusAbbreviation}));this.objDataQuotes=a,this.quotesLength=this.objDataQuotes.length}}else this.objDataQuotes=e.filter((function(t){return 2===t.statusId||3===t.statusId||6===t.statusId||7===t.statusId})),this.quotesLength=this.objDataQuotes.length}},{key:"handleError",value:function(t){var e=t.status;b.i.zero!==e&&b.i.fiveHundred!==e||this.route.navigate(["/system-error"])}}]),t}(),Ne.ngComponentDef=a.Ib({type:Ne,selectors:[["app-quoter-inbox"]],factory:function(t){return new(t||Ne)(a.Ob(l.c),a.Ob(h),a.Ob(v.a),a.Ob(_.a),a.Ob(l.a))},consts:23,vars:10,template:function(t,e){1&t&&(a.Sb(0,"div",C),a.Sb(1,"div",w),a.Sb(2,"div",y),a.Sb(3,"button",I),a.Yb("click",(function(t){return e.refreshQuote()})),a.Pb(4,"img",P),a.Qb(),a.Qb(),a.Sb(5,"div",A),a.Pb(6,"img",S),a.Sb(7,"input",Q),a.Yb("ngModelChange",(function(t){return e.searchQuotation=t})),a.Qb(),a.Qb(),a.Sb(8,"div",q),a.Sb(9,"div",k),a.Sb(10,"button",M),a.Yb("click",(function(t){return e.refreshQuote()})),a.Pb(11,"img",D),a.Qb(),a.Qb(),a.Sb(12,"div",k),a.Sb(13,"button",R),a.Yb("click",(function(t){return e.filterStateQuotes()})),a.Pb(14,"img",U),a.Qb(),a.Qb(),a.Qb(),a.Qb(),a.wc(15,rt,15,3,"div",N),a.Qb(),a.Sb(16,"div",B),a.wc(17,lt,13,0,"div",j),a.wc(18,ft,2,0,"div",T),a.wc(19,Se,3,2,"div",z),a.cc(20,"filterSearch"),a.Qb(),a.wc(21,Me,3,0,"div",$),a.wc(22,Ue,3,1,"div",$)),2&t&&(a.qc(7),a.fc("ngModel",e.searchQuotation),a.qc(15),a.fc("ngIf",!0===e.filterQuotes),a.qc(17),a.fc("ngIf",!0===e.loading),a.qc(18),a.fc("ngIf",0===e.quotesLength),a.qc(19),a.fc("ngForOf",a.ec(20,7,e.objDataQuotes,e.searchQuotation)),a.qc(21),a.fc("ngIf",!1===e.disabledBtnAddQuote),a.qc(22),a.fc("ngIf",!0===e.disabledBtnAddQuote))},directives:[c.a,c.e,c.h,o.k,o.j,o.l],pipes:[O.a,o.d,x.a],styles:["@font-face{font-family:titilliumweb-light;src:url(TitilliumWeb-Light.edc21ba4e5eb0d77c371.ttf)}@font-face{font-family:titilliumweb-regular;src:url(TitilliumWeb-Regular.ed1d014bf2b8b72f27d6.ttf)}@font-face{font-family:ubuntu-light;src:url(Ubuntu-Light.277289c53af7cb469c1d.ttf)}@font-face{font-family:ubuntu-regular;src:url(Ubuntu-Regular.2505bfbd9bde14a7829c.ttf)}@font-face{font-family:opensans-light;src:url(OpenSans-Light.2d0bdc8df10dee036ca3.ttf)}.animated[_ngcontent-%COMP%]{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.fast[_ngcontent-%COMP%]{-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.fadeIn[_ngcontent-%COMP%]{-webkit-animation-name:fadeIn;animation-name:fadeIn}*[_ngcontent-%COMP%]{margin:0;padding:0}.lds-default[_ngcontent-%COMP%]{display:block;position:relative;width:80px;height:80px;margin:5px auto auto}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{position:absolute;width:6px;height:6px;background:#ca005d;border-radius:50%;-webkit-animation:1.2s linear infinite lds-default;animation:1.2s linear infinite lds-default}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s;top:37px;left:66px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:-.1s;animation-delay:-.1s;top:22px;left:62px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:-.2s;animation-delay:-.2s;top:11px;left:52px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-delay:-.3s;animation-delay:-.3s;top:7px;left:37px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-delay:-.4s;animation-delay:-.4s;top:11px;left:22px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(6){-webkit-animation-delay:-.5s;animation-delay:-.5s;top:22px;left:11px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(7){-webkit-animation-delay:-.6s;animation-delay:-.6s;top:37px;left:7px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(8){-webkit-animation-delay:-.7s;animation-delay:-.7s;top:52px;left:11px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(9){-webkit-animation-delay:-.8s;animation-delay:-.8s;top:62px;left:22px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(10){-webkit-animation-delay:-.9s;animation-delay:-.9s;top:66px;left:37px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(11){-webkit-animation-delay:-1s;animation-delay:-1s;top:62px;left:52px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(12){-webkit-animation-delay:-1.1s;animation-delay:-1.1s;top:52px;left:62px}@-webkit-keyframes lds-default{0%,100%,20%,80%{transform:scale(1)}50%{transform:scale(1.5)}}@keyframes lds-default{0%,100%,20%,80%{transform:scale(1)}50%{transform:scale(1.5)}}@media (min-width:300px){.main-section__state[_ngcontent-%COMP%]{background-color:#b0b9dc;border-radius:30px;width:93%}.main-section__state-description[_ngcontent-%COMP%]{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:600;font-size:12.5px;line-height:24px;letter-spacing:.05em;color:#fff}.main-list-quotes[_ngcontent-%COMP%]{background-color:#fff;position:absolute;z-index:1;top:35px;left:13%;width:68%;height:347px}.status-quotation[_ngcontent-%COMP%]{border-radius:30px;border:1px solid #83786f;padding:6px 10px;font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:400;font-size:14px;line-height:30px;text-align:center;letter-spacing:-.01em;color:#83786f}.btn[_ngcontent-%COMP%]{box-shadow:none}.main-list-quotes__div[_ngcontent-%COMP%]{padding-top:11px}.main-list-quotes__circle[_ngcontent-%COMP%]{background-color:#ea9129;padding:.5px 11px;position:relative;right:11px;top:-1px}.main-list-quotes__circle--stateFinish[_ngcontent-%COMP%]{background-color:#687bc6}.main-list-quotes__circle--statepenap[_ngcontent-%COMP%]{background-color:#ea9129}.img-inbox[_ngcontent-%COMP%]{width:25px}.content-btn-view-more[_ngcontent-%COMP%]{position:fixed;bottom:20px;right:20px}.btn-view-more[_ngcontent-%COMP%]{border:none;background-color:transparent}.img-view-more[_ngcontent-%COMP%]{width:55px}.main-section__circle[_ngcontent-%COMP%]{background-color:#ca005d;padding:7.5px;position:relative;right:12px;top:-12px;max-width:30px;display:inline-block}.main-section__circle--modified[_ngcontent-%COMP%]{background-color:#6d6262;padding:7.5px;position:relative;right:12px;top:-12px;max-width:30px;display:inline-block}.content-main-section[_ngcontent-%COMP%]{width:100%;margin:auto}.container-quotation[_ngcontent-%COMP%]{height:80px;padding:10px}.main-section__letter[_ngcontent-%COMP%]{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-size:25px;background-color:#687bc6;padding:5px 10px;color:#fff;min-width:50px;min-height:50px}.main-section__inf-client[_ngcontent-%COMP%]{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:-.01em;color:#83786f;text-align:justify;line-height:13px}.main-section__inf-client--name[_ngcontent-%COMP%]{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-weight:700;-ms-flex-align:center;align-items:center;font-size:14px;padding-bottom:4px}.main-section__text[_ngcontent-%COMP%]{font-size:13px}.container-search[_ngcontent-%COMP%]{width:100%;margin:auto auto 35px;height:65px;background-color:#fff;padding:12px;position:-webkit-sticky;position:sticky;top:104px;z-index:10}.container-search__input[_ngcontent-%COMP%]{width:97%;height:40px;background:#fff;border-radius:10px;border:1px solid #83786f;padding:0 15px;font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:400;font-size:16px;line-height:30px;letter-spacing:-.5px;color:#999}.container-search__input[_ngcontent-%COMP%]:focus{outline:0}.container-search__input[_ngcontent-%COMP%]::-webkit-input-placeholder{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;color:#999}.container-search__input[_ngcontent-%COMP%]::-moz-placeholder{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;color:#999}.container-search__input[_ngcontent-%COMP%]:-ms-input-placeholder{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;color:#999}.container-search__input[_ngcontent-%COMP%]::-ms-input-placeholder{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;color:#999}.container-search__input[_ngcontent-%COMP%]::placeholder{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;color:#999}.container-filter-img[_ngcontent-%COMP%]{width:162px;height:40px;background:#fff;border-radius:10px;border:1px solid #83786f}.container-filter_status-quotation[_ngcontent-%COMP%]{border-radius:30px;border:1px solid #83786f;padding:6px 10px;font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:400;font-size:16px;line-height:30px;text-align:center;letter-spacing:-.01em;color:#83786f}.container-filter_status-quotation[_ngcontent-%COMP%]:hover{background-color:#83786f;color:#fff}.container-filter[_ngcontent-%COMP%]{width:73%;background-color:#fff;padding:22px;margin:auto;height:330px;position:absolute;float:right;right:32px;z-index:20}.container-filter__btn[_ngcontent-%COMP%]{border:1px solid #83786f;border-radius:10px;font-family:ubuntu-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:500;font-size:14px;text-align:center;letter-spacing:-.005em;color:#83786f;display:inline-block;width:100%;height:45px}.container-filter__btn[_ngcontent-%COMP%]:hover{border:1px solid #cb005d}.container-search__img[_ngcontent-%COMP%]{width:30px;position:absolute;top:19px;float:left;left:28px}.container-filter-img__img[_ngcontent-%COMP%]{width:20px}.container-filter-img__show-state[_ngcontent-%COMP%]{width:20px;padding-top:5px}.container-search__btn[_ngcontent-%COMP%]{width:35px}.main-section__date[_ngcontent-%COMP%]{position:absolute;float:right;right:3px;top:-15px;font-size:12px;font-weight:300;text-align:right}.btn-content-state[_ngcontent-%COMP%]{width:100%}.container-quotation__btn-status[_ngcontent-%COMP%]{width:52px}}@media(min-width:992px){.container-search[_ngcontent-%COMP%]{width:90.5%;margin:5px auto auto;background-color:transparent;top:90px}.container-search__input[_ngcontent-%COMP%]{width:93%;height:66px;background:#fff;border-radius:10px;border:none;padding:0 88px;font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:400;font-size:20px;line-height:30px;letter-spacing:-.5px;color:#999}.container-search__input[_ngcontent-%COMP%]:focus{outline:0}.container-search__input[_ngcontent-%COMP%]::-webkit-input-placeholder{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;color:#999}.container-search__input[_ngcontent-%COMP%]::-moz-placeholder{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;color:#999}.container-search__input[_ngcontent-%COMP%]:-ms-input-placeholder{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;color:#999}.container-search__input[_ngcontent-%COMP%]::-ms-input-placeholder{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;color:#999}.container-search__input[_ngcontent-%COMP%]::placeholder{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;color:#999}.container-filter-img[_ngcontent-%COMP%]{width:162px;height:66px;background:#fff;border-radius:10px;border:none}.container-filter_status-quotation[_ngcontent-%COMP%]{border-radius:30px;border:1px solid #83786f;padding:6px 10px;font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:400;font-size:16px;line-height:30px;text-align:center;letter-spacing:-.01em;color:#83786f}.container-filter_status-quotation[_ngcontent-%COMP%]:hover{background-color:#83786f;color:#fff}.container-filter[_ngcontent-%COMP%]{width:400px;background-color:#fff;padding:22px;margin:auto;height:315px;position:absolute;float:right;right:46px;z-index:20}.container-filter__btn[_ngcontent-%COMP%]{border:1px solid #83786f;border-radius:10px;font-family:ubuntu-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:500;font-size:16px;text-align:center;letter-spacing:-.005em;color:#83786f;display:inline-block;width:100%;height:50px}.container-filter__btn[_ngcontent-%COMP%]:hover{border:1px solid #cb005d}.container-search__img[_ngcontent-%COMP%]{width:30px;position:absolute;top:19px;float:left;left:28px}.container-filter-img__img[_ngcontent-%COMP%]{width:40px}.container-filter-img__show-state[_ngcontent-%COMP%]{width:30px}.content-main-section[_ngcontent-%COMP%]{width:91%;margin:30px auto auto}.container-quotation[_ngcontent-%COMP%]{background-color:#fff;height:90px;border-radius:10px}.main-section__date[_ngcontent-%COMP%]{position:absolute;float:right;right:-60px;top:-12px;font-size:16px}.main-section__letter[_ngcontent-%COMP%]{font-family:opensans-light;font-size:30px;min-width:58px;min-height:58px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.main-section__inf-client[_ngcontent-%COMP%]{font-size:18px;padding-left:30px}.main-section__inf-client--rate[_ngcontent-%COMP%], .main-section__inf-client--score[_ngcontent-%COMP%]{font-weight:400;font-size:16px}.container-quotation__btn-status[_ngcontent-%COMP%]{padding-left:15px;max-width:74px}.main-section__state[_ngcontent-%COMP%]{width:96.5%}.main-section__state-description[_ngcontent-%COMP%]{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:600;font-size:20px;line-height:30px;text-align:center;letter-spacing:.05em;color:#fff;display:inline-block}.btn-content-state[_ngcontent-%COMP%]{height:60px}.main-section__inf-client--name[_ngcontent-%COMP%]{padding-bottom:17px;font-size:18px;font-weight:600}.main-section__text[_ngcontent-%COMP%]{font-size:18px;font-weight:400}}@media(min-width:1200px){.container-search[_ngcontent-%COMP%]{width:82.5%}.content-main-section[_ngcontent-%COMP%]{width:83%}}"]}),Ne)}],Te=((Be=function t(){_classCallCheck(this,t)}).ngModuleDef=a.Mb({type:Be}),Be.ngInjectorDef=a.Lb({factory:function(t){return new(t||Be)},imports:[[l.g.forChild(je)],l.g]}),Be);l.g.forChild(je),n.d(e,"QuoterInboxModule",(function(){return $e}));var ze,$e=((ze=function t(){_classCallCheck(this,t)}).ngModuleDef=a.Mb({type:ze}),ze.ngInjectorDef=a.Lb({factory:function(t){return new(t||ze)},imports:[[o.b,Te,s.a,c.b,r.b]]}),ze)}}]);