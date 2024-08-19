import React, { useState, useEffect } from 'react';
import './Survey.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Survey = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [showFollowUp, setShowFollowUp] = useState(false);


  // Define the base questions
  const baseQuestions = [
    {
      question: "What is your gender?",
      options: ["Male", "Female",],
      key: "gender",
    },
    {
      question: "What is your age group?",
      options: ["Under 18", "18-24", "25-34", "35-44", "45-54", "55+"],
      key: "age",
    },
    {
      question: "What is your skin type?",
      options: ["Oily", "Dry", "Combination", "Normal"],
      key: "skinType",
    },
  ];

  const maleQuestions = {
    Oily: [
      { question: "How often does your skin feel greasy or shiny?", options: ["Always", "Sometimes", "Rarely"], key: "greasyShiny" },
      { question: "Do you experience frequent breakouts or acne?", options: ["Yes", "No"], key: "breakouts" },
      { question: "Are these breakouts related to shaving or beard care?", options: ["Yes", "No"], key: "shavingRelated" },
      {
        question: "At your age, are you concerned about the early signs of aging or maintaining skin elasticity?",
        options: [
          "Focus on acne control and oil management",
          "Early signs of aging, oil control",
          "Anti-aging, controlling shine",
          "Wrinkle prevention, oil control",
          "Skin elasticity, hydration",
        ],
        key: "agingConcerns",
      },
      { question: "Do you prefer products designed specifically for men’s skin?", options: ["Yes", "No"], key: "menProducts" },
      { question: "What is your preferred price range for skincare products?", options: ["Under $20", "$20-$50", "$50-$100", "Over $100"], key: "priceRange" }
    ],
    Dry: [
      { question: "How often does your skin feel tight or flaky?", options: ["Always", "Sometimes", "Rarely"], key: "tightFlaky" },
      { question: "Do you have issues with redness or irritation, particularly after shaving?", options: ["Yes", "No"], key: "rednessIrritation" },
      {
        question: "Are you concerned about fine lines, wrinkles, or rough texture?",
        options: [
          "Focus on hydration and soothing redness",
          "Hydration, early wrinkle prevention",
          "Fine lines, improving texture",
          "Reducing wrinkles, deep hydration",
          "Skin sagging, deep wrinkles, intense hydration"
        ],
        key: "skinConcerns",
      },
      { question: "Do you prefer fragrance-free products?", options: ["Yes", "No"], key: "fragranceFree" },
      { question: "What is your preferred price range for skincare products?", options: ["Under $20", "$20-$50", "$50-$100", "Over $100"], key: "priceRange" }
    ],
    Combination: [
      { question: "Which areas of your face are usually oily?", options: ["T-zone", "Cheeks", "Forehead", "Chin"], key: "oilyAreas" },
      { question: "Do you experience both dry and oily areas simultaneously?", options: ["Yes", "No"], key: "dryOilyAreas" },
      {
        question: "What are your primary skin concerns?",
        options: ["Oil control", "Moisture balance", "Pore size", "Fine lines and wrinkles"],
        key: "primaryConcerns"
      },
      { question: "Do you use different products for different areas of your face?", options: ["Yes", "No"], key: "differentProducts" },
      { question: "What is your preferred price range for skincare products?", options: ["Under $20", "$20-$50", "$50-$100", "Over $100"], key: "priceRange" }
    ]
  };

  const femaleQuestions = {
    Oily: [
      { question: "How often does your skin feel greasy or shiny?", options: ["Always", "Sometimes", "Rarely"], key: "greasyShiny" },
      { question: "Do you experience breakouts related to hormonal changes?", options: ["Yes", "No"], key: "hormonalBreakouts" },
      {
        question: "Are you concerned about large pores, blackheads, or early aging?",
        options: [
          "Focus on acne and oil control",
          "Oil control, pore size reduction",
          "Fine lines, pore refinement",
          "Wrinkles, maintaining elasticity",
          "Skin tightening, reducing shine",
        ],
        key: "skinConcerns",
      },
      { question: "Do you prefer products with natural ingredients or specific active ingredients like retinol?", options: ["Yes", "No"], key: "ingredientPreference" },
      { question: "What is your preferred price range for skincare products?", options: ["Under $20", "$20-$50", "$50-$100", "Over $100"], key: "priceRange" }
    ],
    Dry: [
      { question: "How often does your skin feel tight or flaky?", options: ["Always", "Sometimes", "Rarely"], key: "tightFlaky" },
      { question: "Do you experience increased dryness or sensitivity during certain seasons?", options: ["Yes", "No"], key: "seasonalDryness" },
      {
        question: "Are you concerned about fine lines, dullness, or dark spots?",
        options: [
          "Focus on hydration and preventing dullness",
          "Early wrinkle prevention, brightening",
          "Fine lines, reducing dark spots",
          "Deep wrinkles, intense hydration",
          "Sagging skin, brightening dullness",
        ],
        key: "skinConcerns",
      },
      { question: "Do you prefer rich, creamy products or lightweight, hydrating ones?", options: ["Rich & Creamy", "Lightweight & Hydrating"], key: "productPreference" },
      { question: "What is your preferred price range for skincare products?", options: ["Under $20", "$20-$50", "$50-$100", "Over $100"], key: "priceRange" }
    ],
    Combination: [
      { question: "Which areas of your face are usually oily?", options: ["T-zone", "Cheeks", "Forehead", "Chin"], key: "oilyAreas" },
      { question: "Do you experience both dry and oily areas simultaneously?", options: ["Yes", "No"], key: "dryOilyAreas" },
      {
        question: "What are your primary skin concerns?",
        options: ["Oil control", "Moisture balance", "Pore size", "Fine lines and wrinkles"],
        key: "primaryConcerns"
      },
      { question: "Do you prefer to use different products for different areas of your face?", options: ["Yes", "No"], key: "differentProducts" },
      { question: "What is your preferred price range for skincare products?", options: ["Under $20", "$20-$50", "$50-$100", "Over $100"], key: "priceRange" }
    ]
  };

  useEffect(() => {
    setQuestions(baseQuestions);
  }, []);

  const nextStep = () => {
    console.log('step in nextStep: ', step);
    if (step === 0) {
      const gender = answers["gender"];
      const skinType = answers["skinType"];
      let additionalQuestions = [];

      if (gender === "Male") {
        additionalQuestions = maleQuestions[skinType] || [];
      } else if (gender === "Female") {
        additionalQuestions = femaleQuestions[skinType] || [];
      }

      setQuestions(additionalQuestions);  // Set only follow-up questions
      setShowFollowUp(true);  // Show follow-up questions
      setStep(1);  // Move to the next step
    } else {
      setStep(step + 1);  // Continue to next question
    }
  };

  const previousStep = () => {
    console.log('step: ', step);
    if (step > 1) {
      setStep(step - 1);
      console.log('set block');
    } else if (step === 1) {
      setShowFollowUp(false);  // Go back to base questions
    }
    console.log('step after: ', step);
  };

  const handleAnswerChange = (key, value) => {
    setAnswers({ ...answers, [key]: value });
  };

  const renderBaseQuestions = () => {
    return (
      <div className="container">
        {baseQuestions.map((question, index) => (
          <div key={index} className="mb-4 text-center">
            <h5>{question.question}</h5>
            <div className="options d-flex justify-content-center flex-wrap">
              {question.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`option btn btn-outline-primary m-2 ${
                    answers[question.key] === option ? 'selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={question.key}
                    value={option}
                    checked={answers[question.key] === option}
                    onChange={() => handleAnswerChange(question.key, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={nextStep} disabled={Object.keys(answers).length < baseQuestions.length}>
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    const currentQuestion = questions[step - 1];  // Adjusted for the step logic
    console.log('currentQuestion for ',step-1,': ', currentQuestion);
    console.log('all questions: ', questions);
    return (
      <div className="container text-center">
        <button className="btn btn-link text-left" onClick={previousStep}>&lt; Back</button>
        <h2>{currentQuestion.question}</h2>
        <div className="options d-flex justify-content-center flex-wrap">
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className={`option btn btn-outline-primary m-2 ${
                answers[currentQuestion.key] === option ? 'selected' : ''
              }`}
            >
              <input
                type="radio"
                name={currentQuestion.key}
                value={option}
                checked={answers[currentQuestion.key] === option}
                onChange={() => handleAnswerChange(currentQuestion.key, option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={nextStep}>
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!showFollowUp ? renderBaseQuestions() : step <= questions.length ? renderQuestion() : <h2 className="text-center">Survey Complete! Thank you for your answers.</h2>}
    </div>
  );
};

export default Survey;