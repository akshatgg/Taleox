import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({children}) => {
    const dispatch = useDispatch();
    const navigate=useNavigate();


const isloggedIn=useSelector((state)=>state?.auth?.isloggedIn);
const role=useSelector((state)=>state?.auth?.role);
return(
    screen
)

}

export default Layout;