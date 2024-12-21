import { lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Loading from './components/ui/Loading'
const LoginComponent = lazy(() => import('./pages/Login'))
const ForgetPasswordComponent = lazy(() => import('./views/forget-password/ForgetPassword'))
const DashboardComponent = lazy(() => import('./pages/Dashboard'))
const HomeComponent = lazy(() => import('./views/dashboard/home/Home'))
const CategoryComponent = lazy(() => import('./views/dashboard/category/Category'))
const SubCategoryComponent = lazy(() => import('./views/dashboard/sub-category/SubCategory'))
const ProductsComponent = lazy(() => import('./views/dashboard/products/Products'))
const AddCategoryComponent = lazy(() => import('./views/dashboard/category/AddCategory'))
const EditCategoryComponent = lazy(() => import('./views/dashboard/category/EditCategory'))
const AddSubCategoryComponent = lazy(() => import('./views/dashboard/sub-category/AddSubCategory'))
const EditSubCategoryComponent = lazy(() => import('./views/dashboard/sub-category/EditSubCategory'))
const AddProductComponent = lazy(() => import('./views/dashboard/products/AddProduct'))
const EditProductComponent = lazy(() => import('./views/dashboard/products/EditProduct'))
const ResetPasswordComponent = lazy(() => import('./views/forget-password/ResetPassword'))

function ProtectRoute({ children }) {
  const auth = localStorage.getItem('token');
  return auth ? children : <Navigate to="/" />
}

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={
          <Suspense fallback={<Loading />}>
            <LoginComponent />
          </Suspense>
        } />
        <Route path='/forget-password' element={
          <Suspense fallback={<Loading />}>
            <ForgetPasswordComponent />
          </Suspense>
        } />
        <Route path='/dashboard' element={
          <Suspense fallback={<Loading />}>
            <ProtectRoute>
              <DashboardComponent>
                <HomeComponent />
              </DashboardComponent>
            </ProtectRoute>
          </Suspense>
        } />
        <Route path='/dashboard/category' element={
          <Suspense fallback={<Loading />}>
            <ProtectRoute>
              <DashboardComponent>
                <CategoryComponent />
              </DashboardComponent>
            </ProtectRoute>
          </Suspense>
        } />
        <Route path='/dashboard/sub-category' element={
          <Suspense fallback={<Loading />}>
            <ProtectRoute>
              <DashboardComponent>
                <SubCategoryComponent />
              </DashboardComponent>
            </ProtectRoute>
          </Suspense>
        } />
        <Route path='/dashboard/products' element={
          <Suspense fallback={<Loading />}>
            <ProtectRoute>
              <DashboardComponent>
                <ProductsComponent />
              </DashboardComponent>
            </ProtectRoute>
          </Suspense>
        } />
        <Route path='/dashboard/category/add' element={
          <Suspense fallback={<Loading />}>
            <ProtectRoute>
              <DashboardComponent>
                <AddCategoryComponent />
              </DashboardComponent>
            </ProtectRoute>
          </Suspense>
        } />
        <Route path='/dashboard/category/edit/:id' element={
          <Suspense fallback={<Loading />}>
            <ProtectRoute>
              <DashboardComponent>
                <EditCategoryComponent />
              </DashboardComponent>
            </ProtectRoute>
          </Suspense>
        } />
        <Route path='/dashboard/sub-category/add' element={
          <Suspense fallback={<Loading />}>
            <ProtectRoute>
              <DashboardComponent>
                <AddSubCategoryComponent />
              </DashboardComponent>
            </ProtectRoute>
          </Suspense>
        } />
        <Route path='/dashboard/sub-category/edit/:id' element={
          <Suspense fallback={<Loading />}>
            <ProtectRoute>
              <DashboardComponent>
                <EditSubCategoryComponent />
              </DashboardComponent>
            </ProtectRoute>
          </Suspense>
        } />
        <Route path='/dashboard/products/add' element={
          <Suspense fallback={<Loading />}>
            <ProtectRoute>
              <DashboardComponent>
                <AddProductComponent />
              </DashboardComponent>
            </ProtectRoute>
          </Suspense>
        } />
        <Route path='/dashboard/products/edit/:id' element={
          <Suspense fallback={<Loading />}>
            <ProtectRoute>
              <DashboardComponent>
                <EditProductComponent />
              </DashboardComponent>
            </ProtectRoute>
          </Suspense>
        } />
        <Route path='/reset-password/:token' element={
          <Suspense fallback={<Loading />}>
            <ResetPasswordComponent />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;
