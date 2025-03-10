import {React, useContext} from 'react';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { BorderlessLight } from "survey-core/themes";
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const SurveyComponent = () => {
  const surveyJson = {
    logoWidth: "auto",
    logoHeight: "64",
    pages: [
      {
        name: "page2",
        elements: [
          {
            type: "panel",
            name: "customer-details",
            title: "Информация за доставка",
            width: "100%",
            elements: [
              {
                type: "text",
                name: "full-name",
                width: "100%",
                minWidth: "256px",
                titleLocation: "hidden",
                description: "Име и фамилия",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 2, // Minimum 2 characters
                    maxLength: 50, // Maximum 50 characters
                    text: "Името трябва да е между 2 и 50 символа.",
                  },
                ],
              },
              {
                type: "text",
                name: "phone",
                width: "40%",
                minWidth: "224px",
                titleLocation: "hidden",
                description: "Телефонен номер",
                isRequired: true,
                inputType: "tel",
                validators: [
                  {
                    type: "regex",
                    regex: "^[0-9]{10}$", // Validates 10-digit phone numbers
                    text: "Моля, въведете валиден 10-цифрен номер.",
                  },
                ],
              },
              {
                type: "text",
                name: "email",
                width: "60%",
                minWidth: "256px",
                startWithNewLine: false,
                titleLocation: "hidden",
                description: "E-mail",
                isRequired: true,
                validators: [
                  {
                    type: "email", // Built-in email validation
                    text: "Моля, въведете валиден e-mail адрес.",
                  },
                ],
              },
              {
                type: "radiogroup",
                name: "delivery-type",
                title: "Място на получаване",
                isRequired: true,
                choices: [
                  {
                    value: "denev-comp",
                    text: "Офис на Denev Computers",
                  },
                  {
                    value: "address",
                    text: "До адрес",
                  },
                  {
                    value: "speedy",
                    text: "Офис на Спиди",
                  },
                  {
                    value: "econt",
                    text: "Офис на Еконт",
                  },
                ],
              },
              {
                type: "text",
                name: "billing-address",
                visibleIf: "{delivery-type} anyof ['address', 'speedy', 'econt']",
                width: "60%",
                minWidth: "256px",
                titleLocation: "hidden",
                description: "Адрес",
                requiredIf: "{delivery-type} anyof ['address', 'speedy', 'econt']",
                validators: [
                  {
                    type: "text",
                    minLength: 5,
                    maxLength: 100,
                    text: "Адресът трябва да бъде между 5 и 100 символа.",
                  },
                ],
              },
              {
                type: "text",
                name: "city",
                visibleIf: "{delivery-type} anyof ['address', 'speedy', 'econt']",
                width: "40%",
                minWidth: "224px",
                titleLocation: "hidden",
                description: "Град",
                requiredIf: "{delivery-type} anyof ['address', 'speedy', 'econt']",
              },
              {
                type: "text",
                name: "zip",
                visibleIf: "{delivery-type} anyof ['address', 'speedy', 'econt']",
                width: "40%",
                minWidth: "224px",
                startWithNewLine: false,
                titleLocation: "hidden",
                description: "Пощенски код",
                requiredIf: "{delivery-type} anyof ['address', 'speedy', 'econt']",
                validators: [
                  {
                    type: "regex",
                    regex: "^[0-9]{4,5}$", // Validates 4-5 digit postal codes
                    text: "Моля, въведете валиден пощенски код.",
                  },
                ],
              },
              {
                type: "radiogroup",
                name: "payment-type",
                title: "Начин на плащане",
                isRequired: true,
                choices: [
                  {
                    value: "onhand",
                    text: "Наложен платеж",
                  },
                  {
                    value: "online",
                    text: "Онлайн плащане",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    showPrevButton: false,
    showQuestionNumbers: "off",
    questionDescriptionLocation: "underInput",
    pageNextText: "PROCEED",
    completeText: "Изпрати поръчка",
    widthMode: "responsive",
    width: "904",
  };
  

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const makePayment = async (cartData, orderId) => {
    try {
        const stripe = await loadStripe("pk_test_51QcS9kGatbSQRHa59YQrHzqX75xFJfT1NAewN5ymmpLpZSDGn59Y87mEveu8pdEilm4SpKoVBhB1sUqWBx5P3IxT00hQLZqDXx");
        
        const products = cartData.items;

        const response = await fetch('http://localhost:8081/api/create-checkout-session', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ products, orderId }), 
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout session');
        }

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error('Stripe error:', result.error.message);
            alert('Payment initiation failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during payment:', error);
        alert('An error occurred during payment. Please check the console for details.');
    }
};

const handleOrderSubmission = async (surveyData) => {
  try {
       // Fetch cart items
       const cartResponse = await axios.get('http://localhost:8081/api/cart');
       const cartData = cartResponse.data;
   
       // Send survey data and cart info to the backend
       const orderResponse = await axios.post('http://localhost:8081/api/orders', {
         ...surveyData,
         ...cartData,
            userId: user ? user.id : null,
       });
   
       console.log('Order saved successfully:', orderResponse.data);
       const { orderId } = orderResponse.data;
   

    // Trigger payment if online payment is selected
    if (surveyData['payment-type'] === "online") {
      await makePayment(cartData, orderId);
      navigate(`/success?orderId=${orderId}`);  // Move navigate here
    } else {
      navigate(`/success?orderId=${orderId}`);
    }
    
  } catch (error) {
    console.error('Error saving order:', error);
    alert('Failed to save the order. Please try again.');
  }
};


  const survey = new Model(surveyJson);
  survey.applyTheme(BorderlessLight);
  survey.completedHtml = '';
  survey.onComplete.add(async (result) => {
    const surveyData = result.data; // Get survey data
    console.log("Survey Data:", surveyData);
    await handleOrderSubmission(surveyData);
  });


  return <Survey model={survey} />;
};

export default SurveyComponent;
