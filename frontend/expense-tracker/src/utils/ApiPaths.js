export const BASE_URL = "http://localhost:8000";

const API_PATHS = {
AUTH:{ 
  LOGIN: `/api/v1/auth/login`,
  SIGNUP: `/api/v1/auth/register`,
  GET_USER_INFO: `/api/v1/auth/getUser`,
},
DASHBOARD:{
    GET_DATA: `/api/v1/dashboard`,
    GET_ALL_TRANSACTIONS: `/api/v1/dashboard/all-transactions`,
},
INCOME:{    
    GET_ALL_INCOME: `/api/v1/income/get`,
    ADD_INCOME: `/api/v1/income/add`,
    DELETE_INCOME:(incomeId)=> `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `/api/v1/income/download`,
},
EXPENSE:{
    GET_ALL_EXPENSE: `/api/v1/expense/get`,
    ADD_EXPENSE: `/api/v1/expense/add`,
    DELETE_EXPENSE:(expenseId)=> `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: `/api/v1/expense/download`,
},
IMAGE:{
    UPLOAD_IMAGE: `/api/v1/image/upload-image`,
},
}

export default API_PATHS;