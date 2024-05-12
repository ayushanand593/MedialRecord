import { isError } from "lodash";


export const provider=(state={},action)=>{
    switch(action.type){
        case "PROVIDER_LOADED":
            return{
                ...state,
                connection:action.connection,
            };
        case "NETWORK_LOADED":
            return{
                ...state,
                chainId:action.chainId,
            }
        case "ACCOUNT_LOADED":
                return {
                  ...state,
                  account: action.account,
                };
        case "ETHER_BALANCE_LOADED":
                return {
                  ...state,
                  balance: action.balance,
                };
        default:return state;
    }
};
const DEFAULT_MEDICAL_STATE={
loaded:false,
contract:{},
transaction:{
    isSuccessful:false,
},
allMedical:{
    loaded:false,
    data:[],
},
events:[]
}
export const medical=(state=DEFAULT_MEDICAL_STATE,action)=>{
switch(action.type){
    case "MEDICAL_LOADED":
  
        return {
            ...state,
            loaded:true,
            contract:action.medical,

        }
    case "NEW_RECORD_LOADED":

        return{
            ...state,
            transaction:{
                isPending:true,
                isSuccessful:false
            }
        }
    case "NEW_RECORD_SUCCESS":
        console.log('hii');
            return{
                ...state,
                allMedical:{
                    loaded:true,
                    data:[action.medicalOrder],

                },
                transaction:{
                    isPending:false,
                    isSuccessful:true
                },
                events:[action.event, ...state.events]
            }
     case "NEW_RECORD_FAIL":
                return{
                    ...state,
                    transaction:{
                        isPending:false,
                        isError:true,
                        isSuccessful:false
                    }
                }
        default:
            return state;
}
}