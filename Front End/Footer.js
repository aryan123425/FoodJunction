import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className='col-md-4 d-flex align-item-center'>
                    <Link to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    </Link>
                    <span>© 2022 GoFood, Inc</span>
                </div>
            </footer>
        </div>
        
    )
}
