import React, { useState, useEffect } from 'react';
import './LeaseCalculator.css';

const LeaseCalculator = () => {
    const [carType, setCarType] = useState('new');
    const [carPrice, setCarPrice] = useState(10000);
    const [leaseTerm, setLeaseTerm] = useState(12);
    const [downPaymentPercent, setDownPaymentPercent] = useState(10);

    const [leaseCost, setLeaseCost] = useState(0);
    const [downPaymentAmount, setDownPaymentAmount] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [interestRate, setInterestRate] = useState(0);

    useEffect(() => {
        const interestRate = carType === 'new' ? 2.99 : 3.7;
        setInterestRate(interestRate);

        if (carPrice && leaseTerm && downPaymentPercent) {
            const carPriceNumber = parseFloat(carPrice);
            const downPaymentAmount = (carPriceNumber * downPaymentPercent) / 100;
            const loanAmount = carPriceNumber - downPaymentAmount;

            const monthlyInterestRate = interestRate / 100 / 12;
            const numberOfPayments = leaseTerm;

            const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
            const totalLeaseCost = monthlyPayment * numberOfPayments + downPaymentAmount;

            setLeaseCost(totalLeaseCost.toFixed(2));
            setDownPaymentAmount(downPaymentAmount.toFixed(2));
            setMonthlyPayment(monthlyPayment.toFixed(2));
        }
    }, [carType, carPrice, leaseTerm, downPaymentPercent]);

    return (
        <div className="container">
            <h1>Car Leasing Calculator</h1>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="car-type">Car Type:</label>
                    <select id="car-type" value={carType} onChange={(e) => setCarType(e.target.value)}>
                        <option value="new">Brand New</option>
                        <option value="used">Used</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="lease-term">Lease Period (months):</label>
                    <input 
                        type="number" 
                        id="lease-term" 
                        min="12" 
                        max="60" 
                        step="12" 
                        value={leaseTerm} 
                        onChange={(e) => setLeaseTerm(e.target.value)} 
                    />
                    <input 
                        type="range" 
                        id="lease-term-range" 
                        min="12" 
                        max="60" 
                        step="12" 
                        value={leaseTerm} 
                        onChange={(e) => setLeaseTerm(e.target.value)} 
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="car-price">Car Value (€10,000 - €200,000):</label>
                    <input 
                        type="number" 
                        id="car-price" 
                        min="10000" 
                        max="200000" 
                        step="1000" 
                        value={carPrice} 
                        onChange={(e) => setCarPrice(e.target.value)} 
                    />
                    <input 
                        type="range" 
                        id="car-price-range" 
                        min="10000" 
                        max="200000" 
                        step="1000" 
                        value={carPrice} 
                        onChange={(e) => setCarPrice(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="down-payment">Down Payment (10% - 50%):</label>
                    <input 
                        type="number" 
                        id="down-payment" 
                        min="10" 
                        max="50" 
                        step="5" 
                        value={downPaymentPercent} 
                        onChange={(e) => setDownPaymentPercent(e.target.value)} 
                    />
                    <input 
                        type="range" 
                        id="down-payment-range" 
                        min="10" 
                        max="50" 
                        step="5" 
                        value={downPaymentPercent} 
                        onChange={(e) => setDownPaymentPercent(e.target.value)} 
                    />
                </div>
            </div>
            <div className="leasing-details">
                <h2>Leasing Details</h2>
                <div className="details-row">
                    <div className="details-column">
                        <p>Total Leasing Cost: €<span>{leaseCost}</span></p>
                        <p>Down Payment: €<span>{downPaymentAmount}</span></p>
                    </div>
                    <div className="details-column">
                        <p>Monthly Installment: €<span>{monthlyPayment}</span></p>
                        <p>Interest Rate: <span>{interestRate.toFixed(2)}</span>%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaseCalculator;
