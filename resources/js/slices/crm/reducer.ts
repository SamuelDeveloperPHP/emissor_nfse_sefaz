import { createSlice } from "@reduxjs/toolkit";


export const initialState: any = {
  crmcontacts: [],
  companies: [],
  isLeadCreated: false,
  deals: [],
  leads: [],
  error: {}
};

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {

    // companies

    getCompanies: (state: any, action: any) => {
      state.companies = action.payload;
    },

    addNewCompanies: (state: any, action: any) => {
      state.companies.push(action.payload);
      state.isCompaniesCreated = false;
      state.isCompaniesSuccess = true;
    },

    deleteCompanies: (state: any, action: any) => {
      state.companies = state.companies.filter(
        (company: any) => company.id.toString() !== action.payload.toString());
      state.isCompaniesDelete = true;
      state.isCompaniesDeleteFail = false;
      
    },

    updateCompanies: (state: any, action: any) => {
      state.companies = state.companies.map((company: any) =>
        company.id === action.payload.id ? { ...company, ...action.payload } : company);
      state.isCompaniesUpdate = true;
      state.isCompaniesUpdateFail = false;
    },

    // contacts

    getContacts: (state: any, action: any) => {
      state.crmcontacts = action.payload;
      state.isContactCreated = false;
      state.isContactSuccess = true;
    },

    addNewContact: (state:any, action: any) => {
      state.crmcontacts.push(action.payload);
          state.isCompaniesCreated = true;
          state.isCompaniesAdd = true;
          state.isCompaniesAddFail = false;
    },

    deleteContact: (state:any, action:any) => {
      state.crmcontacts = (state.crmcontacts || []).filter((contact:any) => contact.id.toString() !== action.payload.toString());
          state.isContactDelete = true;
          state.isContactDeleteFail = false;
    },

    updateContact: (state:any, action:any) => {
      state.crmcontacts = state.crmcontacts.map((contact:any) =>
            contact.id === action.payload.id
              ? { ...contact, ...action.payload }
              : contact
          );
          state.isCompaniesCreated = true;
          state.isCompaniesAdd = true;
          state.isCompaniesAddFail = false;
    },

    // deals
    getDeals: (state:any, action: any) => {
      state.deals = action.payload;
    },

    // leads
    getLeads: (state:any, action: any) => {
      state.leads = action.payload;
    },

    addNewLead: (state:any, action: any) => {
      state.leads.push(action.payload);
    state.isLeadCreated = true;
    state.isLeadsAdd = true;
    state.isLeadsAddFail = false;
    },

    updateLead: (state:any, action:any) => {
      state.leads = state.leads.map((lead:any) =>
            lead.id === action.payload.id
              ? { ...lead, ...action.payload }
              : lead);
          state.isLeadsUpdate = true;
          state.isLeadsUpdateFail = false;
    },

    deleteLead: (state:any, action:any) => {
      state.leads = state.leads.filter(
              (lead:any) => lead.id.toString() !== action.payload.toString()
            );
            state.isLeadsDelete = true;
            state.isLeadsDeleteFail = false;
    }
  },
});
export const { getCompanies, addNewCompanies, deleteCompanies, updateCompanies, getContacts, addNewContact, deleteContact, updateContact, getDeals, getLeads, addNewLead, updateLead, deleteLead } = crmSlice.actions;
export default crmSlice.reducer;



