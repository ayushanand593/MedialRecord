import React, { useState } from "react";
import "./form.css";
import { submitRecord } from "../../store/interactions";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "../../firebaseconfig";

const Form = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

  const {formSubmit} =useFirebase();

  const account = useSelector((state) => state.provider.account);
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const dispatch = useDispatch();

  // const postUserData = (event) => {
  //   const { name, value } = event.target;
  //   // Update state with new value
  //   setName({ ...name, [name]: value });
  //   // Also update state directly
  //   if (name === "name") setName(value);
  //   else if (name === "age") setAge(value);
  //   else if (name === "gender") setGender(value);
  //   else if (name === "bloodType") setBloodType(value);
  //   else if (name === "allergies") setAllergies(value);
  //   else if (name === "diagnosis") setDiagnosis(value);
  //   else if (name === "treatment") setTreatment(value);
  // };

  const submitHandler = async (e) => {
    e.preventDefault();

    await submitRecord(
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      provider,
      medical,
      dispatch
    );
  };

  const submitData = async (event) => {
    // console.log(name);
    event.preventDefault();
    // Your submitData logic here
    console.log("Data submitted:", { name, age, gender, bloodType, allergies, diagnosis, treatment });
    // const authenticatedUserId = "authenticatedUserId";
    formSubmit(age,
      allergies,
      bloodType,
      diagnosis,
      gender,
      name,
      treatment);
    // const url = `https://sdp-is18-default-rtdb.firebaseio.com/users/${authenticatedUserId}/medicalRecord.json`;
    // const res = await fetch("https://sdp-is18-default-rtdb.firebaseio.com/medicalRecord.json", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     age,
    //     gender,
    //     bloodType,
    //     allergies,
    //     diagnosis,
    //     treatment,
    //   }),
    // });

    // if (res.ok) {
    //   alert("Data stored successfully");
    // } else {
    //   alert("Error storing data");
    // }

    // Call submitHandler after submitting data to Firebase
    submitHandler(event);
    
  };

  return (
    <div class="login-container">
    {account ? (
        <form onSubmit={submitData} class="w-96 mt-4 mx-auto bg-white p-6 shadow-lg rounded-md" method="POST">
            <h1 class="text-center mb-8 text-gray-700">Patient Details</h1>
            <label for="name" class="block font-bold mb-2 text-gray-700">Patient Name:</label>
            {/* <input type="text" id="name" name="name" value={name} onChange={(e) => postUserData(e)} required placeholder="Enter Patient Name" class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"/> */}
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter Patient Name" class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"/>

            <label for="age" class="block font-bold mb-2 text-gray-700">Age:</label>
            <input type="number" id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} required placeholder="Enter Patient Age" class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"/>

            <label for="gender" class="block font-bold mb-2 text-gray-700">Gender:</label>
            <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>

            <label for="bloodType" class="block font-bold mb-2 text-gray-700">Blood type:</label>
            <input type="text" id="bloodType" name="bloodType" value={bloodType} onChange={(e) => setBloodType(e.target.value)} required placeholder="Enter Patient BloodGroup" class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"/>

            <label for="allergies" class="block font-bold mb-2 text-gray-700">Allergies:</label>
            <input type="text" id="allergies" name="allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} required placeholder="Enter Patient Allergies" class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"/>

            <label for="diagnosis" class="block font-bold mb-2 text-gray-700">Diagnosis:</label>
            <input type="text" id="diagnosis" name="diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required placeholder="Enter Patient Diagnosis" class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"/>

            <label for="treatment" class="block font-bold mb-2 text-gray-700">Treatment:</label>
            <input type="text" id="treatment" name="treatment" value={treatment} onChange={(e) => setTreatment(e.target.value)} required placeholder="Enter Patient Treatment" class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"/>

            <input type="submit" value="Submit" class="w-full px-4 py-2 bg-gray-800 text-white rounded-md cursor-pointer transition-colors hover:bg-gray-700"/>
        </form>
    ) : (
        <h1 class="text-center text-2xl mt-20 mb-20 h-[40vh] text-white">Connect the account first</h1>
    )}
   
</div>

  );
  
};

export default Form;
