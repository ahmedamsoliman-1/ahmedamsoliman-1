// PaymentInfo.js
import React from 'react';

export function PaymentInfo() {
  // You can fetch payment and bill information from an API or other data source.
  // For this example, I'll assume you have a payment object and an array of outstanding bills.
  const payment = {
    accountNumber: '123456789',
    dueDate: '2023-11-01',
    amountDue: 100.00,
  };

  const outstandingBills = [
    {
      billNumber: 'BILL-001',
      dueDate: '2023-10-15',
      amountDue: 50.00,
    },
    // Add more outstanding bills here
  ];

  return (
    <div>
      <h2>Payment Information</h2>
      <p>Account Number: {payment.accountNumber}</p>
      <p>Due Date: {payment.dueDate}</p>
      <p>Amount Due: ${payment.amountDue.toFixed(2)}</p>

      <h2>Outstanding Bills</h2>
      <ul>
        {outstandingBills.map((bill) => (
          <li key={bill.billNumber}>
            <p>Bill Number: {bill.billNumber}</p>
            <p>Due Date: {bill.dueDate}</p>
            <p>Amount Due: ${bill.amountDue.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
