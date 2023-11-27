//import { toast } from 'react-hot-toast';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
// import { emailInfo } from '../reset_pass/slice';
// import { style } from 'src/shared/styles/yup/style';


export interface RegistrationInfo {
    email: string
    username: string
    image: string
    id: number
    role: string
    emailVerified: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | null | undefined
}

interface CreateRegistrationParams {
    email: string
    password: string
}

export const createRegistration = createAsyncThunk<
    RegistrationInfo,
    CreateRegistrationParams,
    {
        rejectValue: string
    }
>(
    "registration/createRegistration",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            const url = "https://balancy-backend-demo.onrender.com/auth/register"
            const res = await axios.post<RegistrationInfo>(`${url}`, param)
            // dispatch(emailInfo(param.email))

            return res.data
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<any>
                if (axiosError.response?.data) {
                    // toast.error(axiosError.response?.data.message, { style })
                }
                if (axiosError.message === "Network Error") {
                    // toast.error(axiosError.message, { style })
                }
                return rejectWithValue(err.response?.data)
            }
            return rejectWithValue(err.message)
        } finally {

        }
    }
)