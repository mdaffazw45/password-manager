import React from 'react'
import { useParams , useNavigate } from "react-router-dom";

const Input = () => {

  const { category } = useParams();
  return (
    <div>
      <h1>INPUT UTAMA</h1>
    </div>
  )
}

export default Input
