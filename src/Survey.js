import React, { useState, useEffect } from 'react';
import './Survey.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Survey = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);

  // Define the base questions
  const baseQuestions = [
    {
      question: "What is your gender?",
      options: ["Male", "Female", "Non-binary", "Prefer not to say"],
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
    ]
  };

  useEffect(() => {
    setQuestions(baseQuestions);
  }, []);

  const nextStep = () => {
    if (step === 2) {
      const gender = answers["gender"];
      const skinType = answers["skinType"];
      let additionalQuestions = [];

      if (gender === "Male") {
        additionalQuestions = maleQuestions[skinType] || [];
      } else if (gender === "Female") {
        additionalQuestions = femaleQuestions[skinType] || [];
      }

      setQuestions((prevQuestions) => [...prevQuestions, ...additionalQuestions]);
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleAnswerChange = (value) => {
    const currentQuestion = questions[step];
    setAnswers({ ...answers, [currentQuestion.key]: value });
  };

  const renderQuestion = () => {
    const currentQuestion = questions[step];
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <h2>{currentQuestion.question}</h2>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`option ${answers[currentQuestion.key] === option ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={currentQuestion.key}
                    value={option}
                    checked={answers[currentQuestion.key] === option}
                    onChange={() => handleAnswerChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Button variant="secondary" onClick={prevStep} disabled={step === 0}>
              Back
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={nextStep}>
              {step < questions.length - 1 ? 'Next' : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <div className="survey-container">
      {/* <Button variant="link" onClick={prevStep} className="back-button">← Back</Button> */}
      {step < questions.length ? renderQuestion() : <h2>Survey Complete! Thank you for your answers.</h2>}
    </div>
  );
};

export default Survey;

