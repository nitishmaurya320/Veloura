import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, deleteUser, fetchUsers, updateUser } from '../../../redux/slices/adminSlice';
const UserManagement = () => {
        const dispatch=useDispatch()
        const navigate=useNavigate()


        const {user}=useSelector((state)=>state.auth)
        const {users,loading,error} =useSelector((state)=>state.admin)

        useEffect(()=>{
          if(user&&user.role!=="admin"){
            navigate("/")
          }
        },[user,navigate])

        useEffect(()=>{
          if(user&&user.role==="admin"){
            dispatch(fetchUsers())
          }
        },[dispatch,users])

        const [formData, setFormData] = useState({
            name: '',
            email: '',
            password:'',
            role: 'customer'
        });
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData))
    // You can integrate API call here to submit the data
  };
  const handleRoleChange=(userId,role)=>{
    dispatch(updateUser({id:userId,name:user.name,email:user.email,role:role}))

  }
  const handleUserDelete=(userId)=>{
    if(window.confirm("Are you want to Delete this user?")){
        dispatch(deleteUser(userId))
    }
    else{
        
    }
  }
 
  return (
    <div className='w-full border'>
        <div className="w-full mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Add New User</h2>
      {loading&&<p>Loading</p>}
      {error&&<p>Error : {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="role">Role</label>
          <select
            
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add User
        </button>
      </form>
    </div> 
    <div className='w-full mx-auto p-6 bg-white rounded shadow mt-5'>
         <table className='text-left  w-full' >
                     <thead className='p-2'>
                            <tr className=''>
                                <th className='bg-gray-400 p-1 '>Name</th>
                                <th className='bg-gray-400 '>Email</th>
                                <th className='bg-gray-400 '>Role </th>
                                <th className='bg-gray-400 '>Actions</th>
                                
                            </tr>
        </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className='p-2'>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select value={user.role} onChange={(e)=>{handleRoleChange(user._id,e.target.value)}}>
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button className='bg-red-500 rounded-md px-3 hover:bg-red-700' onClick={()=>{handleUserDelete(user._id)}}>
                                        Delete
                                    </button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
    </div> 
    </div>
  )
}

export default UserManagement
