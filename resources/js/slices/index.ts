import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// team
import TeamReducer from "./team/reducer";

//Calendar
import CalendarReducer from "./calendar/reducer";

// API key
import APIKeyReducer from "./apiKey/reducer";

// To do
import TodosReducer from "./todos/reducer";

// Job
import JobReducer from "./jobs/reducer";

// File Manager
import FileManagerReducer from "./fileManager/reducer";

//Project
import ProjectsReducer from "./projects/reducer";

//Crypto
import CryptoReducer from "./crypto/reducer";

//Chat
import chatReducer from "./chat/reducer";

//Mailbox
import MailboxReducer from "./mailbox/reducer";

//TicketsList
import TicketsReducer from "./tickets/reducer";

//Invoice
import InvoiceReducer from "./invoice/reducer";

// Tasks
import TasksReducer from "./tasks/reducer";

//Crm
import CrmReducer from "./crm/reducer";

// Dashboard Analytics
import DashboardAnalyticsReducer from "./dashboardAnalytics/reducer";

//Ecommerce
import EcommerceReducer from "./ecommerce/reducer";

// Dashboard CRM
import DashboardCRMReducer from "./dashboardCRM/reducer";

//  Dashboard Ecommerce
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";

// Dashboard Cryto
import DashboardCryptoReducer from "./dashboardCrypto/reducer";

// Dashboard Project
import DashboardProjectReducer from "./dashboardProject/reducer";

// Dashboard NFT
import DashboardNFTReducer from "./dashboardNFT/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Team: TeamReducer,
    Calendar: CalendarReducer,
    APIKey: APIKeyReducer,
    Todos: TodosReducer,
    Jobs: JobReducer,
    FileManager: FileManagerReducer,
    Projects: ProjectsReducer,
    Crypto: CryptoReducer,
    Chat: chatReducer,
    Mailbox: MailboxReducer,
    Tickets: TicketsReducer,
    Invoice: InvoiceReducer,
    Tasks: TasksReducer,
    Crm: CrmReducer,
    DashboardAnalytics: DashboardAnalyticsReducer,
    Ecommerce: EcommerceReducer,
    DashboardCRM: DashboardCRMReducer,
    DashboardEcommerce: DashboardEcommerceReducer,
    DashboardCrypto: DashboardCryptoReducer,
    DashboardProject: DashboardProjectReducer,
    DashboardNFT: DashboardNFTReducer,
})

export default rootReducer;