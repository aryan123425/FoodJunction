// import React from 'react'
import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch } from 'react-redux'
import { useDispatchCart, useCart } from './contextReducer';
// import { ToastContainer, toast } from 'react-toastify';

export default function Card(props) {

    let options = props.options;
    let priceOption = Object.keys(options);
    let dispatch = useDispatchCart()
    let data = useCart();
    const priceRef = useRef()
    const [qty, setQty] = useState(1)
    // const dispatch = useDispatch()
    const [size, setSize] = useState("")
    // let foodItem = props.foodItems;
    // const notify = () => toast("Wow so easy!");

    const handleAddToCart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
    
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, img: props.foodItem.img, price: finalPrice, qty: qty, size: size })

        // console.log(data);
        //    toast.success("dvjbjhx")

    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])


    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodItem.img} Name="card-img-top" alt="..." style={{ height: "180px", objectFit: "fill" }} />
                    <div Name="card-body">
                        <h5 Name="card-title" className='mx-4 my-3'>{props.foodItem.name}</h5>

                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOption.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr></hr>
                        <button className={`btn btn-success justify-center mx-4 mb-3`} onClick={handleAddToCart}>Add To Cart</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
