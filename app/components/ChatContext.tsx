import { create } from "domain";
import { createContext } from "react";


type StreamResponse={
    addMessage:()=>void,
    message:string,
    handleInputChnage:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    isLoading:boolean
}

export const ChatContext=createContext<StreamResponse>({
    addMessage:()=>{},
    message:" ",
    handleInputChnage:()=>{},
    isLoading:false,
})