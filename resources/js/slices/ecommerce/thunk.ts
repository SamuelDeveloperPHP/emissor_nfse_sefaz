
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewCustomer, addNewProduct, deleteCustomer, deleteProducts, getCustomers, getProducts, getSellers, updateCustomer } from './reducer';
import { customerList, productsData, sellersList } from '../../common/data';

export const onGetSellers = () => async (dispatch:any) => {
  try {
    dispatch(getSellers(sellersList))
  } catch (error) {
    return error;
  }
}

export const onGetProducts = () => async (dispatch:any) => {
  try {
    dispatch(getProducts(productsData))
  } catch (error) {
    return error;
  }
}

export const onAddNewProduct = (data:any) => async (dispatch:any) => {
  try {
    dispatch(addNewProduct(data))
    toast.success("Product Added Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Product Added Failed", { autoClose: 3000 });
    return error;
  }
}

export const ondeleteProducts = (data:any) => async (dispatch:any) => {
  try {
    dispatch(deleteProducts(data))
    toast.success("Product Deleted Successfully", { autoClose: 3000 });
  } catch (error){
    toast.error("Product Deleted Failed", { autoClose: 3000 });
    return error;
  }

}


export const onGetCustomers = () => async (dispatch:any) => {
  try {
    dispatch(getCustomers(customerList))
  } catch (error) {
    return error;
  }
} 

export const onAddNewCustomer = (data:any) => async (dispatch:any) => {
  try {
    dispatch(addNewCustomer(data))
    toast.success("Customer Added Successfully", { autoClose: 3000 });
  }
  catch (error) {
    toast.error("Customer Added Failed", { autoClose: 3000 });
    return error;
  }
}

export const onDeleteCustomer = (data:any) => async (dispatch:any) => {
  try {
    dispatch(deleteCustomer(data))
    toast.success("Customer Deleted Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Customer Deleted Failed", { autoClose: 3000 });
    return error;
  }
}

export const onUpdateCustomer = (data:any) => async (dispatch:any) => {
  try {
    dispatch(updateCustomer(data))
    toast.success("Customer updated Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Customer updated Failed", { autoClose: 3000 });
    return error;
  }
}