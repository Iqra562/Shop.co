export const  PublicRoutes = {
  HOME:'/',
  PRODUCTS:'/products',
  PRODUCTDETAILS:'/product-details/:id',
  GETPRODUCTBYCATEGORY:'/product',
  LOGIN:'/login',
  REGISTER:'/register',
  VERIFYOTP:'/verify-otp'
} 
export const AuthenticatedUserRoutes = {
  CART:'/cart',
  ORDERS:'/orders',
  ORDERSUMMARY:'/order-summary',
  WISHLIST:'/wishlist',
  ADDRESSBOOK:'/addressbook',
  PROFILE:'/profile',
  WISHLIST:'/wishlist',
  ADDADDRESS:'/add-address',
  EDITADDRESS:'/edit-address/:id',
  EDITPROFILE:'/edit-profile' 

  
} 
export const AdminRoutes = {
  DASHBOARD:'/admin',
  FETCHPRODUCTS:'/admin/fetchproducts',
  PRODUCT_ADD:'/admin/product/add',
  PRODUCT_EDIT:'/admin/product/edit/:id',
  FETCHCATEGORY:'/admin/fetchcategory',
  CATEGORY_ADD:'/admin/category/add',
  CATEGORY_EDIT:'/admin/product/edit/:id'
  
} 