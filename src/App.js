
import './App.css';
import { useEffect } from 'react';
import {loadProvider,loadNetwork,loadMedical,subscribeToEvent} from "./store/interactions";
import { useDispatch } from 'react-redux';
import { Form, Navbar } from './components';
import config from "./config.json"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login/login';
import { FirebaseProvider } from './firebaseconfig';

const router=createBrowserRouter([
{
  path:"/",
  element:(
    <FirebaseProvider>
    <Login />
    </FirebaseProvider>
  )
},
{
  path:"/home",
  element:(
    <>
    <FirebaseProvider>
      <Navbar />
      <Form />
      </FirebaseProvider>
    </>
  )
}
]);
function App() {
  const dispatch=useDispatch();
  const loadBlockchainData=async()=>{
    const provider=loadProvider(dispatch);
    console.log(provider);
    const chainId=await loadNetwork(provider,dispatch);
    console.log(chainId);
    const medical_config=config[chainId].MedicalRecord;
    
    const medical=await loadMedical(provider,medical_config.address,dispatch);
   
    subscribeToEvent(medical, dispatch);
  };
  useEffect(()=>{
    loadBlockchainData();
  })
  return (
    <div className="App">
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
