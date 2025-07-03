import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductDetails, updateProduct } from '../../../redux/slices/productsSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const EditProduct = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {id}=useParams()
  const {selectedProduct,loading,error}=useSelector((status)=>status.products)
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes:[],
        colors:[],
        collections: "",
        material: "",
        gender:"",
        
        images: [
               
            ]
    });

    const [uploading,setUploading]=useState(false)

      useEffect(()=>{
        if(id){
          dispatch(fetchProductDetails(id))
        }
      },[dispatch,id])

      useEffect(() => {
  if (selectedProduct) {
    setProductData((prevData) => ({
      ...prevData,
      ...selectedProduct.product,
     
    }));
  }
}, [selectedProduct]);


    const handleChange=(e)=>{
      const {name,value}=e.target 
      setProductData((prevData)=>({...prevData,[name]:value}))

    }
    const handleImageUpload= async (e)=>{
      const file=e.target.files[0]; 
      const formData=new FormData()
      formData.append("image",file)
      try {
        setUploading(true)
        const {data}= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,
          formData,{
            headers:{
              "Content-Type":"multipart/form-data"
            }
          }
        )
        setProductData((prevData)=>({
          ...prevData,
          images:[...prevData.images,{url: data.imageUrl,altText:""}]
        })
      )
      setUploading(false)
      } catch (error) {
        console.log(error)
        setUploading(false)
        
      }
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      dispatch(updateProduct({id,productData}))
      navigate("/admin/products")
    }
    console.log(productData)
    if(loading) return <p>loading...</p>
    if(error) return <p>Error...{error}</p>
  return (
    <div className=' w-[80%] mx-auto rounded-md shadow-md p-5'>
      <form onSubmit={handleSubmit}>
     <div className='flex flex-col mb-6'>
      <label>Name</label>
      <input name="name" value={productData.name} className='border' onChange={handleChange} type="text"></input>
     </div>
     <div className='flex flex-col mb-6'> 
      <label>Description</label>
      <textarea name="description" type="text" value={productData.description} onChange={handleChange} className='border' rows={4}></textarea>
     </div>
     {/* {price} */}

     <div className='flex flex-col mb-6'>
      <label>Price</label>
      <input name="price" type="number" value={productData.price}  onChange={handleChange}></input>
     </div>


     <div className='flex flex-col mb-6'>
      <label>Count in stock</label>
      <input name="countInStock" type="number" value={productData.countInStock}  onChange={handleChange}></input>
     </div>
     <div className='flex flex-col mb-6'>
      <label>SKU</label>
      <input name="sku" type="text" value={productData.sku}  onChange={handleChange}></input>
     </div>

     <div className='flex flex-col mb-6'>
      <label>Sizes-(comma-seperated)</label>
      <input name="sizes" type="text" value={(productData.sizes||[]).join(",")}  
      onChange={(e)=>{setProductData({...productData,sizes: e.target.value.split(",").map((size)=>size.trim())})}}></input>
     </div>

     <div className='flex flex-col mb-6'>
      <label>Colours-(comma-seperated)</label>
      <input className='border' name="colors" type="text" value={(productData.colors||[]).join(",")}  
      onChange={(e)=>{setProductData({...productData,colors: e.target.value.split(",").map((color)=>color.trim())})}}></input>
     </div>

      {/* {image upload} */}
      <div className='flex flex-col mb-6'>
      <label>Upload Image</label>
      <input  name="colors" type="file"  
      onChange={handleImageUpload}></input>
      {uploading&&<p>uploading image...</p>}
      <div className='flex gap-2'>
        {
          (productData.images||[]).map((image,index)=>{
            return(
              <img className='w-[70px] h-[70px] rounded-md' key={index} src={image.url}/>
            )
          })
        }
      </div>
     </div>
      <button type="submit" className='bg-green-400 hover:bg-green-350 px-2 py-1 rounded-lg'>Update Details</button>

     
    </form>
    </div>
  )
}

export default EditProduct
