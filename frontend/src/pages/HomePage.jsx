import React from 'react';
import { useEffect, useState } from 'react';

const HomePage = () => {

  const [products, setproducts] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [dltID, setDltID] = useState("")

  const [update, setUpdate] = useState()

  async function getdata() {
    try {
      const response = await fetch('https://productstore-m6fk.onrender.com/api/products')
      const result = await response.json()
      setproducts(result.data)
    } catch (error) {
      
    }
  }

  // pop up for the confirmation of the deleting the product
  async function handleDelete(id) {
    setIsDeleting(true)
    setDltID(id)  
  }
  // deleting the product 
  async function confirmDelete(){
    const response = await fetch(`http://localhost:5000/api/products/${dltID}`, { method: 'DELETE' })
    // const result = await response.json()
    getdata()
    setIsDeleting(false)
  }

// pop up editing the product details
  async function handleUpdate(product) {
    setIsEditing(true)
    setUpdate(product)
  }

  // saving the changes in the product
  const saveUpdate =  async()=>{
    try {
      console.log(update);
      
      const response = await fetch(`http://localhost:5000/api/products/${update._id}`, 
      { 
        method: 'PUT',
        body: JSON.stringify(update),
        headers:{"Content-Type": "application/json" }  
      })
      setUpdate({});
      const result = await response.json()
      console.log(result);
      
      getdata()
      setIsEditing(false)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  
  useEffect(() => {
    getdata()
  }, [])

return (
  <div className='w-full min-h-screen h-full bg-zinc-900'>

    {isEditing ?
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
          <h3 className="text-white text-lg font-medium mb-4">Add Product</h3>
          <input className="w-full py-2 px-3 mb-4 rounded-lg bg-transparent border-2 outline-none border-zinc-900 text-white" name="name" placeholder="Name" value={update.name} onChange={(e) => setUpdate(prev => ({ ...prev, name: e.target.value }))} />
          <input className="w-full py-2 px-3 mb-4 rounded-lg bg-transparent border-2 outline-none border-zinc-900 text-white" name="price" type="number" value={update.price} onChange={(e) => setUpdate(prev => ({ ...prev, price: e.target.value }))} placeholder="Price" />
          <input className="w-full py-2 px-3 mb-4 rounded-lg bg-transparent border-2 outline-none border-zinc-900 text-white" name="image" type="text" value={update.image} onChange={(e) => setUpdate(prev => ({ ...prev, image: e.target.value }))} placeholder="Image URL" />
          <div className="flex justify-end mt-4">
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded mr-2" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" onClick={()=>saveUpdate()}>Save</button>
          </div>
        </div>
      </div> : <div></div>
    }

      {isDeleting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-white text-lg font-medium mb-4">Are you sure you want to delete this product?</h3>
            <div className="flex justify-end mt-4">
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded mr-2" onClick={() => setIsDeleting(false)}>Cancel</button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => { confirmDelete()}}>Delete</button>
            </div>
          </div>
        </div>
      )}

    <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {products.length > 0 ? products.map((product) => (
        <div key={product._id} className="max-w-sm bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
          {/* Image */}
          <img
            className="w-full h-48 object-cover"
            src={product.image}
            alt={product.name}
          />

          {/* Card Content */}
          <div className="p-4">
            {/* Name */}
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>

            {/* Price */}
            <p className="text-lg text-green-400 font-semibold mb-4">Price: ${product.price}</p>

            {/* Action Button */}
            <div className='flex justify-end'>
              <button className="bg-blue-500 text-white mx-2 px-3 py-1 rounded-lg hover:bg-blue-600 transition" onClick={() => handleUpdate(product)}>
                Edit
              </button>
              <button className="bg-red-400 text-white mx -2 px-3 py-1 rounded-lg hover:bg-red-500 transition" onClick={() => handleDelete(product._id)}>
                Delete
              </button>
              {/* <button className="bg-red-500 text-white p-2 rounded mt-4" onClick={() => setIsDeleting(true)}>Delete Product</button> */}
            </div>
          </div>
        </div>
      )) : <div className='flex justify-center text-4xl text-gray-700 font-extrabold w-fit m-'>No products Found</div>}
    </div>
  </div>
);
};

export default HomePage;