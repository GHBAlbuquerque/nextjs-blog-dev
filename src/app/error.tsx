"use client";

import DisplayErrorMessage from "@/components/DisplayErrorMessage"
import { useEffect } from "react"

type RootErrorPageProps = {
    error: Error,
    reset: () => void;
}

export default function RootErrorPage({ error }: RootErrorPageProps){
    useEffect(() => {

    }, [error])

    return (
        <DisplayErrorMessage pageTitle={"Internal Server Error"} contentTitle={"501"} content={
           <>
           <p>Ooops... There was an error trying to find what you`re looking for! Try again later.</p> 
           </>
        } />
    )
}