import React, { createContext, useReducer } from 'react'
import { useContext } from 'react';
const CartStateContext = createContext();
const CartDispatchContext = createContext();        //context Api VVI

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr
        case "UPDATE":
            let arr = [...state];
            let existingFoodIndex = arr.findIndex(food => food.id === action.id);

            if (existingFoodIndex !== -1) {
                arr[existingFoodIndex] = {
                    ...arr[existingFoodIndex],
                    qty: arr[existingFoodIndex].qty + parseInt(action.qty),
                    price: arr[existingFoodIndex].price + action.price
                };
                return arr;
            }
            // let arr = [...state]
            // arr.find((food, index) => {
            //     if (food.id === action.id) {
            //         // console.log(food.qty, parseInt(action.qty), action.price + food.price)
            //         arr[index] = { ...food, qty: action.qty + food.qty, price: action.price + food.price }   //parseInt(action.qty)
            //     }
            //     return arr
            // })
            return arr
        default: console.log("Error in reducer")
    }

}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )

}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
