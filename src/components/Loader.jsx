"use client";
import React from "react";

const SPINNER_CLASS =
    "animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900";

function Loader({message = "Loading..."}) {
    return (
        <div
            className="flex justify-center items-center h-screen"
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="flex flex-col items-center gap-4">
                <div className={SPINNER_CLASS} aria-hidden="true"/>
                <span className="text-gray-900">{message}</span>
            </div>
        </div>
    );
}

export default React.memo(Loader);