function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function _createClass(t,n,e){return n&&_defineProperties(t.prototype,n),e&&_defineProperties(t,e),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{VnVz:function(t,n,e){"use strict";e.r(n);var i=e("fXoL"),a=e("ofXK"),o=e("PCNd"),l=e("tyNb"),c=e("mrSG"),d=e("XNiG"),r=e("1G5W"),s=e("smev"),f=e("+T8B"),g=e("iVvC"),b=e("xk4g"),u=e("38X0"),p=e("aZ8m"),m=e("Wy0o"),h=[1,"container-view-attach-file"],x=["src","assets/icons/loguito.png","alt","icon-landscape",1,"icon-logo","d-none","d-lg-block","logo"],v=[1,"container-header","d-lg-block","d-none","animated"],P=[1,"container-header-nav"],w=["class","lds-default",4,"ngIf"],C=["class","container-file-list",4,"ngIf"],_=["id","exampleModalCenter","tabindex","-1","role","dialog","data-backdrop","false","aria-labelledby","exampleModalCenterTitle","aria-hidden","true",1,"modal","fade"],y=["role","document",1,"modal-dialog","modal-dialog-centered"],M=[1,"modal-content"],O=["type","button","data-dismiss","modal","aria-label","Close",1,"close"],k=["aria-hidden","true"],S=[1,"modal-body"],F=[1,"imagenFileShow",3,"src","alt"],Q=[1,"lds-default"];function I(t,n){1&t&&(i.Sb(0,"div",Q),i.Pb(1,"div"),i.Pb(2,"div"),i.Pb(3,"div"),i.Pb(4,"div"),i.Pb(5,"div"),i.Pb(6,"div"),i.Pb(7,"div"),i.Pb(8,"div"),i.Pb(9,"div"),i.Pb(10,"div"),i.Pb(11,"div"),i.Pb(12,"div"),i.Qb())}var q=[1,"container-file-list"],D=[1,"w-100","position-relative","header-attach-file","animated","fadeIn"],z=[1,"py-2","py-lg-4","mb-lg-0","header-attach-file__item"],j=["class","animated content-attach-file fadeIn px-4 d-flex align-items-center justify-content-around",4,"ngFor","ngForOf"],A=[1,"animated","content-attach-file","fadeIn","px-4","d-flex","align-items-center","justify-content-around"],$=["src","assets/icons/landscape.png","alt","icon-landscape",1,"mx-2","icon-landscape","d-none","d-lg-block"],E=[1,"mt-2","col-xs","w-100"],T=["type","button","data-toggle","modal","data-target","#exampleModalCenter",1,"btn","content-attach-file__item",3,"click"],N=[1,"file-name"],V=[3,"href"],H=["src","assets/icons/download.png","alt","icon-download",1,"mx-2","icon-download"];function L(t,n){if(1&t){var e=i.Tb();i.Sb(0,"div",A),i.Sb(1,"div"),i.Pb(2,"img",$),i.Qb(),i.Sb(3,"div",E),i.Sb(4,"button",T),i.Yb("click",(function(t){i.oc(e);var a=n.$implicit;return i.bc(2).imagenShow(a.id)})),i.Sb(5,"label",N),i.xc(6),i.Qb(),i.Qb(),i.Qb(),i.Sb(7,"div"),i.Sb(8,"a",V),i.Pb(9,"img",H),i.Qb(),i.Qb(),i.Qb()}if(2&t){var a=n.$implicit,o=i.bc(2);i.qc(6),i.yc(a.nameDocument),i.qc(8),i.ic("href","",o.ApiUrl,"",a.nameDocument,"",i.pc)}}function R(t,n){if(1&t&&(i.Sb(0,"div",q),i.Sb(1,"div",D),i.Sb(2,"p",z),i.xc(3),i.Qb(),i.Qb(),i.wc(4,L,10,3,"div",j),i.Qb()),2&t){var e=i.bc();i.qc(3),i.zc("Archivos adjuntos - Cotizaci\xf3n: ID ",e.quotationId,""),i.qc(4),i.fc("ngForOf",e.dataFiles)}}var U,W,X=[{path:"",component:(U=function(){function t(n,e){_classCallCheck(this,t),this.quoterQuotationViewService=n,this.route=e,this.unsubscribe$=new d.a,this.ApiUrl="".concat(s.a).concat(f.e).concat(g.i),this.dataFiles=[]}return _createClass(t,[{key:"ngOnInit",value:function(){this.subscribeFile()}},{key:"ngOnDestroy",value:function(){return c.a(this,void 0,void 0,regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.unsubscribe$.next(),this.unsubscribe$.complete();case 1:case"end":return t.stop()}}),t,this)})))}},{key:"subscribeFile",value:function(){var t=this;this.loadingFilePage=!0,this.quoterQuotationViewService.listFile.pipe(Object(r.a)(this.unsubscribe$)).subscribe((function(n){if(t.dataFiles=n,0===n.length)t.loadingFilePage=!0;else{t.dataFiles=n;var e=/(.pdf)$/i;n.forEach((function(n){t.isFilePdf=!!e.exec(n.nameDocument)})),n.forEach((function(n){return t.quotationId=n.quotationId})),t.loadingFilePage=!1}}),(function(n){t.loadingFilePage=!1,t.handleError(n)}))}},{key:"imagenShow",value:function(t){var n=this;this.dataFiles.forEach((function(e){t===e.id&&(n.imageFile=e.nameDocument,n.documentName=e.nameDocument)}))}},{key:"handleError",value:function(t){var n=t.status;b.i.zero!==n&&b.i.fiveHundred!==n||this.route.navigate(["/system-error"])}}]),t}(),U.ngComponentDef=i.Ib({type:U,selectors:[["app-files"]],factory:function(t){return new(t||U)(i.Ob(u.a),i.Ob(l.c))},consts:15,vars:5,template:function(t,n){1&t&&(i.Sb(0,"div",h),i.Pb(1,"img",x),i.Sb(2,"div",v),i.Pb(3,"app-header"),i.Qb(),i.Pb(4,"app-header-nav",P),i.wc(5,I,13,0,"div",w),i.wc(6,R,5,2,"div",C),i.Sb(7,"div",_),i.Sb(8,"div",y),i.Sb(9,"div",M),i.Sb(10,"button",O),i.Sb(11,"span",k),i.xc(12,"\xd7"),i.Qb(),i.Qb(),i.Sb(13,"div",S),i.Pb(14,"img",F),i.Qb(),i.Qb(),i.Qb(),i.Qb(),i.Qb()),2&t&&(i.qc(5),i.fc("ngIf",!0===n.loadingFilePage),i.qc(6),i.fc("ngIf",!1===n.loadingFilePage),i.qc(14),i.ic("src","",n.ApiUrl,"",n.imageFile,"",i.pc),i.gc("alt",n.documentName))},directives:[p.a,m.a,a.k,a.j],styles:["@font-face{font-family:titilliumweb-light;src:url(TitilliumWeb-Light.edc21ba4e5eb0d77c371.ttf)}@font-face{font-family:titilliumweb-regular;src:url(TitilliumWeb-Regular.ed1d014bf2b8b72f27d6.ttf)}@font-face{font-family:ubuntu-regular;src:url(Ubuntu-Regular.2505bfbd9bde14a7829c.ttf)}.animated[_ngcontent-%COMP%]{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.fast[_ngcontent-%COMP%]{-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.fadeIn[_ngcontent-%COMP%]{-webkit-animation-name:fadeIn;animation-name:fadeIn}.lds-default[_ngcontent-%COMP%]{display:block;position:relative;width:80px;height:80px;margin:5px auto auto}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{position:absolute;width:6px;height:6px;background:#ca005d;border-radius:50%;-webkit-animation:1.2s linear infinite lds-default;animation:1.2s linear infinite lds-default}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s;top:37px;left:66px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:-.1s;animation-delay:-.1s;top:22px;left:62px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:-.2s;animation-delay:-.2s;top:11px;left:52px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-delay:-.3s;animation-delay:-.3s;top:7px;left:37px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-delay:-.4s;animation-delay:-.4s;top:11px;left:22px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(6){-webkit-animation-delay:-.5s;animation-delay:-.5s;top:22px;left:11px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(7){-webkit-animation-delay:-.6s;animation-delay:-.6s;top:37px;left:7px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(8){-webkit-animation-delay:-.7s;animation-delay:-.7s;top:52px;left:11px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(9){-webkit-animation-delay:-.8s;animation-delay:-.8s;top:62px;left:22px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(10){-webkit-animation-delay:-.9s;animation-delay:-.9s;top:66px;left:37px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(11){-webkit-animation-delay:-1s;animation-delay:-1s;top:62px;left:52px}.lds-default[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(12){-webkit-animation-delay:-1.1s;animation-delay:-1.1s;top:52px;left:62px}@-webkit-keyframes lds-default{0%,100%,20%,80%{transform:scale(1)}50%{transform:scale(1.5)}}@keyframes lds-default{0%,100%,20%,80%{transform:scale(1)}50%{transform:scale(1.5)}}@media (min-width:300px){.header-attach-file[_ngcontent-%COMP%]{background:#ca005d;height:45px}.header-attach-file__item[_ngcontent-%COMP%]{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:600;font-size:20px;line-height:30px;text-align:center;letter-spacing:-.5px;color:#fff}.content-attach-file__item[_ngcontent-%COMP%]{height:40px;background:#c4c4c4;border-radius:3px;width:100%}.file-name[_ngcontent-%COMP%]{font-family:titilliumweb-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:400;font-size:14px;line-height:21px;-ms-flex-align:center;align-items:center;letter-spacing:-.5px;color:#646464;cursor:pointer}.icon-landscape[_ngcontent-%COMP%]{width:25px;height:25px}.icon-download[_ngcontent-%COMP%]{width:18px}.btn-file[_ngcontent-%COMP%]{box-shadow:none}.imagenFileShow[_ngcontent-%COMP%]{width:100%}.container-view-attach-file[_ngcontent-%COMP%]{background-color:#e5e5e5;height:100vh}}@media(min-width:992px){.container-view-file-page[_ngcontent-%COMP%]{background-color:#646464}.header-attach-file[_ngcontent-%COMP%]{background:#91004b;height:69px;margin-bottom:65px}.file-name[_ngcontent-%COMP%]{font-size:19px;text-align:left;display:block;padding-left:5%}.icon-landscape[_ngcontent-%COMP%]{width:44px;height:40px}.icon-download[_ngcontent-%COMP%]{width:30px}.content-attach-file__item[_ngcontent-%COMP%]{background:#c4c4c4;border-radius:3px;width:100%}.content-attach-file[_ngcontent-%COMP%]{background-color:#c4c4c4;padding-bottom:2%;padding-top:2%;width:60%;height:90px;margin:2% auto auto}.container-header[_ngcontent-%COMP%]{width:100%;position:fixed;z-index:100}.container-file-list[_ngcontent-%COMP%]{position:relative;top:160px;background:#fff;height:675px;width:67%;margin:auto}.icon-logo[_ngcontent-%COMP%]{width:80px;position:fixed;z-index:200}.container-header-nav[_ngcontent-%COMP%]{position:absolute;top:90px;left:33px}.container-view-attach-file[_ngcontent-%COMP%]{background-color:#e5e5e5;height:890px}.logo[_ngcontent-%COMP%]{left:26px}.header-attach-file__item[_ngcontent-%COMP%]{font-family:ubuntu-regular,Arial,Helvetica,sans-serif;font-style:normal;font-weight:500;font-size:20px;line-height:23px;text-align:center;text-indent:10px;color:#fff;text-transform:uppercase}}"]}),U)}],G=((W=function t(){_classCallCheck(this,t)}).ngModuleDef=i.Mb({type:W}),W.ngInjectorDef=i.Lb({factory:function(t){return new(t||W)},imports:[[l.g.forChild(X)],l.g]}),W);l.g.forChild(X),e.d(n,"FilesPageModule",(function(){return B}));var J,B=((J=function t(){_classCallCheck(this,t)}).ngModuleDef=i.Mb({type:J}),J.ngInjectorDef=i.Lb({factory:function(t){return new(t||J)},imports:[[a.b,o.a,G]]}),J)}}]);