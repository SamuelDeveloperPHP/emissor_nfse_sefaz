
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewCompanies, addNewContact, addNewLead, deleteCompanies, deleteContact, deleteLead, getCompanies, getContacts, getDeals, getLeads, updateCompanies, updateContact, updateLead } from "./reducer";
import { companies, crmcontacts, deals, leads } from "../../common/data";

// companies
export const onGetCompanies = () => async (dispatch: any) => {
  try {
    dispatch(getCompanies(companies));
  } catch (error) {
    return error;
  }

}

export const onAddNewCompanies = (data: any) => async (dispatch: any) => {
  try {
    dispatch(addNewCompanies(data));
    toast.success("Company Added Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Company Added Failed", { autoClose: 3000 });
    return error;
  }
}


export const onDeleteCompanies = (data: any) => async (dispatch: any) => {
  try {

    dispatch(deleteCompanies(data))
    toast.success("Company Deleted Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Company Deleted Failed", { autoClose: 3000 });
    return error;
  }

}


export const onUpdateCompanies = (data: any) => async (dispatch: any) => {
  try {
    dispatch(updateCompanies(data))
    toast.success("Company Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Contact Updated Failed", { autoClose: 3000 });
    return error;
  }
}

// contacts

export const onGetContacts = () => async (dispatch: any) => {
  try {
    dispatch(getContacts(crmcontacts));
  } catch (error) {
    return error;
  }
}


export const onAddNewContact = (data: any) => async (dispatch: any) => {
  try {
    dispatch(addNewContact(data));
    toast.success("Contact Added Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Contact Added Failed", { autoClose: 3000 });
    return error;
  }
}

export const onDeleteContact = (data: any) => async (dispatch: any) => {
  try {
    dispatch(deleteContact(data))
    toast.success("Contact Deleted Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Contact Deleted Failed", { autoClose: 3000 });
    return error;
  }
}

export const onUpdateContact = (data: any) => async (dispatch: any) => {
  try {
    dispatch(updateContact(data))
    toast.success("Contact Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Contact Updated Failed", { autoClose: 3000 });
    return error;
  }
}


// deals

export const onGetDeals = () => async (dispatch: any) => {
  try {
    dispatch(getDeals(deals));
  } catch (error) {
    return error;
  }
}

// leads

export const onGetLeads = () => async (dispatch: any) => {
  try {
    dispatch(getLeads(leads));
  } catch (error) {
    return error;
  }
}

export const onAddNewLead = (data:any) => async (dispatch: any) => {
  try {
    dispatch(addNewLead(data));
    toast.success("Lead Added Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Lead Added Failed", { autoClose: 3000 });
    return error;
  }
}


export const onUpdateLead =(data:any) => async (dispatch:any) => {
  try {
    dispatch(updateLead(data))
    toast.success("Lead Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Lead Updated Failed", { autoClose: 3000 });
    return error;
  }
}


export const onDeleteLead = (data:any) => async (dispatch:any) => {
  try {
    dispatch(deleteLead(data))
    toast.success("Lead Deleted Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Lead Deleted Failed", { autoClose: 3000 });
    return error;
  }
}

