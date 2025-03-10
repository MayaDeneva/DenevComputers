import React from "react";
import { Survey } from "survey-react-ui";
import 'survey-core/defaultV2.min.css';
import { Model } from "survey-core";
import { BorderlessLight } from "survey-core/themes";

const ContactSurvey = () => {
  // Define survey JSON schema
  const surveyJson = {
    elements: [{
      name: "name",
      title: "Вашите имена:",
      type: "text",
      isRequired: true,
    }, {
      name: "email",
      title: "Email:",
      type: "text",
      isRequired: true,
    }, {
        name: "message",
        title: "Вашата заявка:",
        type: "comment",
        isRequired: true,
    }]
  };
  


  // Create a Survey Model instance
  const survey = new Model(surveyJson);
  survey.applyTheme(BorderlessLight);
  survey.completeText = "Изпрати";
  survey.requiredError = "Моля, попълнете.";

  // Handle survey completion
survey.onComplete.add((sender) => {
    const surveyData = sender.data;
  
    // Send data to the backend
    fetch("http://localhost:8081/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surveyData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Благодарим, че се свързахте с нас! Очаквайте отговор по имейл.");
        } else {
          alert("Възникна проблем при записването на вашите данни.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Възникна грешка при изпращане на заявката.");
      });
  });
  

  return (
    <div>
      <h1 className="text-3xl font-bold bg-neutral">Свържете се с нас!</h1>
      <Survey model={survey} />
    </div>
  );
};

export default ContactSurvey;
