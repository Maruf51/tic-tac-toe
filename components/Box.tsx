import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BoxTypes {
    children: ReactNode,
    bgColor?: string,
    bgHeight?: 1 | 2,
    disabled?: boolean
}

const Box = ({ children, bgColor = '#0f202a', bgHeight = 1, disabled = false }: BoxTypes) => {
    return (
        <div className={twMerge("overflow-hidden rounded-md relative duration-300 select-none w-full", !disabled && (bgHeight === 1 ? 'pb-1 active:pt-1 active:pb-0' : 'pb-1.5 active:pt-1.5 active:pb-0'), disabled && (bgHeight === 1 ? 'pb-1' : 'pb-1.5'))}>
            <div className={twMerge("overflow-hidden rounded-md z-10 relative", !disabled && 'cursor-pointer')}>
                {children}
            </div>
            <div style={{ background: bgColor }} className={twMerge(`w-full h-1/2 absolute bottom-0 left-0`)}>
            </div>
        </div>
    )
}

export default Box;