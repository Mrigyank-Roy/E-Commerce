import {cart} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOption.js';
import {formatCurrency} from '../utils/money.js';

export function renderPaymentSummary(){
  let productProceCents = 0;
  let shipingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productProceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shipingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productProceCents + shipingPriceCents;
  const taxCents = totalBeforeTaxCents*0.1;

  const totalCents = totalBeforeTaxCents + taxCents;


  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$${formatCurrency(productProceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shipingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  
};