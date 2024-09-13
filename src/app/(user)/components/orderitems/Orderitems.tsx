import React from 'react'

function Orderitems() {
    return (
        <>
            <div className="order-tracker">
                <div className="order-summary">
                    <h2>Shipment 1 (3 items)</h2>
                    <p>₹822</p>
                </div>

                <div className="progress-bar">
                    <div className="step completed">Order Confirmed</div>
                    <div className="step completed">Shipped</div>
                    <div className="step completed">Out for delivery</div>
                    <div className="step">Delivery</div>
                </div>

                <div className="delivery-info">
                    <p>Your item is out for delivery</p>
                    <p>Sat, 7th Sep 2:11 pm</p>
                    <p>Expected by Sat, 7th</p>
                </div>

                <div className="contact-info">
                    <p>Contact delivery person at: 01146907777 PIN: 107</p>
                </div>

                <div className="order-items">
                    {[
                        {
                            name: "FORTUNE Premium kachi ghani pure Mustard Oil Can",
                            price: "₹675",
                            image: "fortune-oil.jpg"
                        },
                        {
                            name: "Everyuth Naturals Purifying Neem Antibacterial Neem & Tea Tree Oil Hydrated, Clear Face Wash",
                            price: "₹102",
                            image: "everyuth-face-wash.jpg"
                        },
                        {
                            name: "Mountain Dew Soft Drink PET Bottle",
                            price: "₹45",
                            image: "mountain-dew.jpg"
                        }
                    ].map(item => (
                        <div className="order-item" key={item.price}>
                            <img src={item.image} alt={item.name} />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p>{item.price}</p>
                            </div>
                            <button className="return-button">Return</button>
                            <p className="arrival-info">Arriving today by 11 pm</p>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Orderitems