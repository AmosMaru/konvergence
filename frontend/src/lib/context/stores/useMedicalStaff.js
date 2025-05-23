import { create } from "zustand";
import API from "../../api";

const useMedicalStaff = create((set) => ({
    medicalStaff: [],
    loading: false,

   fetchMedicalStaff: async () => {
    set({ loading: true });
    try{
        const res = await API.get("/auth/v1/users/get_medical_staff");
        if(res.data.success){
            set({ medicalStaff: res.data.response[0].details[0].data });
        }

    }
    catch(error){
        console.error("Error fetching medical staff", error);
    }
    finally{
        set({ loading: false });
    }
   }
}));

export default useMedicalStaff;

