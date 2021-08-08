import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/phone-number',
    pathMatch: 'full'
  },    
  {
    path: '',
    loadChildren: () => import('./authorization/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'phone-number',
    loadChildren: () => import('./authorization/phone-number/phone-number.module').then( m => m.PhoneNumberPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./authorization/verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'set-location',
    loadChildren: () => import('./authorization/set-location/set-location.module').then( m => m.SetLocationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./authorization/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./authorization/stores/stores.module').then( m => m.StoresPageModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./authorization/items/items.module').then( m => m.ItemsPageModule)
  },
  {
    path: 'variation-selection',
    loadChildren: () => import('./authorization/variation-selection/variation-selection.module').then( m => m.VariationSelectionPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./authorization/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./authorization/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'order-placed',
    loadChildren: () => import('./authorization/order-placed/order-placed.module').then( m => m.OrderPlacedPageModule)
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./authorization/my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./authorization/order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./authorization/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'custom-delivery',
    loadChildren: () => import('./authorization/custom-delivery/custom-delivery.module').then( m => m.CustomDeliveryPageModule)
  },
  {
    path: 'package-type',
    loadChildren: () => import('./authorization/package-type/package-type.module').then( m => m.PackageTypePageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./authorization/my-account/my-account.module').then( m => m.MyAccountPageModule)
  },
  {
    path: 'saved-addresses',
    loadChildren: () => import('./authorization/saved-addresses/saved-addresses.module').then( m => m.SavedAddressesPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./authorization/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./authorization/terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./authorization/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'buyappalert',
    loadChildren: () => import('./authorization/buyappalert/buyappalert.module').then( m => m.BuyappalertPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./authorization/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'socila-login',
    loadChildren: () => import('./authorization/socila-login/socila-login.module').then( m => m.SocilaLoginPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./authorization/reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'add-review',
    loadChildren: () => import('./authorization/add-review/add-review.module').then( m => m.AddReviewPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./authorization/wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'add-money',
    loadChildren: () => import('./authorization/add-money/add-money.module').then( m => m.AddMoneyPageModule)
  },
  {
    path: 'item-category',
    loadChildren: () => import('./authorization/item-category/item-category.module').then( m => m.ItemCategoryModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
