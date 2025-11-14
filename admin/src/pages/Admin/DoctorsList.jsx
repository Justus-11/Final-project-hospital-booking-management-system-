import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/adminContext'

const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors } = useContext(AdminContext)

    useEffect(()=>{
        if (aToken) {
            getAllDoctors()
        }
    })
  return (
    <div>

    </div>
  )
}

export default DoctorsList