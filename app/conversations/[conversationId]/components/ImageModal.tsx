'use client'
import React from 'react';
import Modal from "@/app/components/Modal";
import Image from 'next/image'
interface ImageModalProps{
    src?: string | null;
    isOpen:boolean
    onClose: () => void
}
const ImageModal = ({src,isOpen,onClose}:ImageModalProps) => {
    if (!src) {
        return null;
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80">
                <Image
                    className="object-cover"
                    fill
                    sizes={'320px'}
                    alt="Image"
                    src={src}
                />
            </div>
        </Modal>
    );
};

export default ImageModal;