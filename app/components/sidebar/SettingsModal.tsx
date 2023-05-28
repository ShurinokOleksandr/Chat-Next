'use client'
import {User} from "@prisma/client";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import {CldUploadButton} from "next-cloudinary";
import Button from "@/app/components/Button";
import Image from 'next/image';
import {CgProfile} from "react-icons/cg";

interface SettingsModalProps {
    currentUser:User
    isOpen:boolean
    onClose:() => void
}
const SettingsModal = ({currentUser,isOpen,onClose}:SettingsModalProps) => {

    const router = useRouter()

    const [isLoading,setIsLoading] = useState(false)

    const {handleSubmit,register,watch,setValue,formState:{errors}} = useForm<FieldValues>({defaultValues:{
            name:currentUser?.name,
            image:currentUser?.image
        }})
    const image = watch('image')
    console.log(register,'register')
    const handleUpload = (relust:any) =>{
        setValue('image',relust?.info?.secure_url,{shouldValidate:true})
    }

    const onSumbit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        axios.post('/api/settings',data)
            .then(() => {
                router.refresh()
                onClose()
            })
            .catch(() =>{
                toast.error("Upload error")
            })
            .finally(() =>
                setIsLoading(false)
            )
    }



    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <form onSubmit={handleSubmit(onSumbit)}>
                <div className={'space-y-12'}>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className=" text-base  font-semibold  leading-7  text-gray-900">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Edit your public information.
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                            <div>
                                <label
                                    htmlFor="photo"
                                    className=" block  text-sm  font-medium  leading-6  text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image
                                        width="48"
                                        height="48"
                                        className="rounded-full"
                                        src={image || currentUser?.image || <CgProfile/>}
                                        alt="Avatar"
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="pgc9ehd5"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="mt-6 flex items-center justify-end gap-x-6">
                    <Button
                        disabled={isLoading}
                        secondary
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default SettingsModal;