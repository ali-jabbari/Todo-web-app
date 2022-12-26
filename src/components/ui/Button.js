import styled from "styled-components";
import tw from "twin.macro";

export const Button = styled.button`
    ${props => props.style1 && tw`
        mb-1.5 mr-2 bg-white
        px-5 py-1 border border-slate-400 rounded-full duration-300
        hover:bg-blue-700 hover:cursor-pointer hover:text-white hover:border
        hover:border-blue-700 sm:mb-0
    `}

    ${props => props.style2 && tw`
        mb-2 ml-4 bg-transparent border border-slate-400 px-2 py-1
        rounded-full text-slate-400 cursor-pointer sm:mb-0`}

    ${props => props.active && tw`bg-blue-600 cursor-pointer text-white
        border border-blue-600`}
`