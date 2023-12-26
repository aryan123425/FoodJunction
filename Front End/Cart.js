import React from 'react';
import { useCart, useDispatchCart } from '../Components/contextReducer'
import trash from "../Trash2.jpg"
export default function Cart() {
    let data = useCart()
    let dispatch = useDispatchCart();
    // if (data.length === 0)
    // console.log("123456")
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 text-light w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div className='bg-secondry' >
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table '>
                    <thead className=' text-success fs-4 '>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            {/* <th scope='col' >Image</th> */}
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody className='table-hover' >
                        {data.map((food, index) => (
                            <tr className='text-light '>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td >{food.qty}</td>
                                <td >{food.size}</td>
                                <td >{food.price}</td>
                                {/* <td><img src={food.img} width="35" height="35" alt="delete" /></td> */}
                                <td ><button type="button" className="btn p-0 text-light" ><img src={trash} width="20" height="20" alt="Delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /> </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h1 className='fs-2 text-light'>Total Price: ₹ {totalPrice}/-</h1></div>
                {/* <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div> */}
            </div>



        </div>
    )
}