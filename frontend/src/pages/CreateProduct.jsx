import React from 'react'
import { useState } from 'react'

function CreateProduct() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  console.log(name, price, image);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name, 
      price,
      image
    }

    await fetch('/api/products', { 
      method: 'POST', 
      headers: {
        'Content-Type' : 'application/json'
      }, 
      body: JSON.stringify(data) });

      setImage('')
      setName('')
      setPrice(0)
      
  }

  return (
    <div className="w-full min-h-screen h-full bg-zinc-900 text-white p-10">
      <h1 className="text-3xl mb-8 text-center">Add a New Item</h1>

      <form
        className="flex flex-col max-w-[400px] m-auto bg-gray-800 p-6 rounded-lg"
        onSubmit={handleSubmit}
      >

        <label htmlFor="name" className="mb-2 font-semibold">Item Name:</label>
        <input
          className="py-2 px-3 mb-4 rounded-lg bg-transparent border-2 outline-none border-zinc-800"
          type="text"
          id="name"
          name="name"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="price" className="mb-2 font-semibold">Price:</label>
        <input
          className="py-2 px-3 mb-4 rounded-lg bg-transparent border-2 outline-none border-zinc-800"
          type="number"
          id="price"
          name="price"
          
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Image Input */}
        <label htmlFor="image" className="mb-2 font-semibold">Upload Image:</label>
        <input
          className="py-2 px-3 mb-4 rounded-lg bg-transparent border-2 outline-none border-zinc-800"
          type="text"
          id="image"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Item
        </button>
      </form>
    </div>

  )
}

export default CreateProduct
