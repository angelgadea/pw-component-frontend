import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// component
import { LayoutQuoteComponent } from './layout-quotation/layout-quote.component';
import { LayoutApproverComponent } from './layout-approver/layout-approver.component';
// authguard
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'change-password-on-demand',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/change-password-on-demand/change-password.module').then(m => m.ChangePasswordModule)
  },
  {
    path: 'change-forgotten-password',  
    loadChildren: () => import('./modules/change-forgotten-password/change-forgotten-password.module').then(m => m.ChangeForgottenPasswordModule)
  },
  {
    path: 'quote',
    component: LayoutQuoteComponent,
    children: [
      {
        path: '',
        redirectTo: 'new-quotation',
        pathMatch: 'full'
      },
      {
        path: 'new-quotation',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/quotation/new-quotation.module').then(m => m.NewQuotationModule)
      },
      {
        path: 'quoter-inbox',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/quoter-inbox/quoter-inbox.module').then(m => m.QuoterInboxModule)
      }
    ]
  },
  {
    path: 'quoter-quotation-view',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/quoter-quotation-view/quoter-quotation-view.module').then(m => m.QuoterQuotationViewModule)
  },
  {
    path: 'tem-evaluation',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/tem-evaluation/tem-evaluation.module').then(m => m.TemEvaluationModule)
  },
  {
    path: 'quoter-history',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/quoter-history/quoter-history.module').then(m => m.QuoterHistoryModule)
  },
  {
    path: 'files-quotation',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/files-page/files-page.module').then(m => m.FilesPageModule)
  },
  {
    path: 'approver',
    component: LayoutApproverComponent,
    children: [
      {
        path: '',
        redirectTo: 'approver-inbox',
        pathMatch: 'full'
      },
      {
        path: 'approver-inbox',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/quoter-inbox/quoter-inbox.module').then(m => m.QuoterInboxModule)
      }
    ]
  },
  {
    path: 'system-error',
    loadChildren: () => import('./modules/system-error/system-error.module').then(m => m.SystemErrorModule)
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
