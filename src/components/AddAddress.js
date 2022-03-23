import { useState, useEffect } from 'react'

const AddAddress = () => {
  useEffect(() => {
    async function postRecord(data) {
      const response = await fetch(`http://localhost:5000/landlord/add`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application  /json',
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      return response.json()
    }

    postRecord('Chris').then((data) => {
      console.log(data)
    })
  }, [])

  return <div>AddAddress</div>
}

export default AddAddress
