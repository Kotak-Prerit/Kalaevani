import React from "react";

const BulkOrder = () => {
  return (
    <div className="bulk-order-container">
      <div className="image-section">
        <img
          src={
            "https://res.cloudinary.com/dqzqrsuli/image/upload/v1736032069/bulkOrders_xaam3k.png"
          }
          alt="Bulk Order Process"
        />
      </div>
      <div className="info-section poppins flex justify-center items-center">
        <h3>What's Included</h3>
        <h1>For Bulk Orders</h1>
        <ul>
          <li>No MOQ on sizing or colours.</li>
          <li>Same fabrics as our signature line.</li>
          <li>Same print quality as our signature line.</li>
          <li>In-house manufacturing & timely delivery</li>
        </ul>
        <button className="cta-button">Let's work?</button>
      </div>
    </div>
  );
};

export default BulkOrder;
