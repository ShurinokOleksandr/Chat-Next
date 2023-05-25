'use client'
import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";

interface MessageInputProps {
    id:string
    register:UseFormRegister<FieldValues>
    errors:FieldErrors
    required:boolean
    placeholder?:string
    type?:string
}


const MessageInput = ({id,register,errors,required,placeholder,type}:MessageInputProps) => {
    return (
        <div className={'relative w-full'}>
            <input
                id={id}
                type={type}
                className={'text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none'}
                {...register(id, {required})}
                placeholder={placeholder}
            />
        </div>
    );
};

export default MessageInput;