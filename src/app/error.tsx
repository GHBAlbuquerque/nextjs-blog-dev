"use client";

import DisplayErrorMessage from "@/components/DisplayErrorMessage"
import { useEffect } from "react"

type RootErrorPageProps = {
    error: Error,
    reset: () => void;
}

export default function RootErrorPage({error, reset}: RootErrorPageProps){
    useEffect(() => {
        console.log(error);
    }, [error])

    return (
        <DisplayErrorMessage pageTitle={"Uncaught Exception"} contentTitle={"500"} content={
           <>
           <p>"Ooops... There was an error trying to find what you're looking for!"</p> 
           <button onClick={()=> reset()}>Click here to try again</button>
           </>
        } />
    )
}