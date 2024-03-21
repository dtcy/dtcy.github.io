const Questions = [
  {
    id: 1,
    text: "What is the purpose of your website?",
    answers: [
      { id: 1, text: "Personal blog", nextQuestionId: 2 },
      { id: 2, text: "E-commerce", nextQuestionId: 2 },
      { id: 3, text: "Corporate website", nextQuestionId: 2 },
      // Add more options as needed
    ],
  },
  {
    id: 2,
    text: "What features do you require on your website?",
    answers: [
      { id: 1, text: "Contact form", nextQuestionId: 3 },
      { id: 2, text: "Product catalog", nextQuestionId: 3 },
      { id: 3, text: "User registration", nextQuestionId: 3 },
      // Add more options as needed
    ],
  },
  {
    id: 3,
    text: "Do you need a content management system (CMS)?",
    answers: [
      { id: 1, text: "Yes", nextQuestionId: 4 },
      { id: 2, text: "No", nextQuestionId: 5 },
    ],
  },
  {
    id: 4,
    text: "Which CMS platform do you prefer?",
    answers: [
      { id: 1, text: "WordPress", nextQuestionId: 5 },
      { id: 2, text: "Shopify", nextQuestionId: 5 },
      { id: 3, text: "Custom-built", nextQuestionId: 5 },
      // Add more options as needed
    ],
  },
  {
    id: 5,
    text: "What is your preferred design style?",
    answers: [
      { id: 1, text: "Minimalist", nextQuestionId: 6 },
      { id: 2, text: "Modern", nextQuestionId: 6 },
      { id: 3, text: "Classic", nextQuestionId: 6 },
      // Add more options as needed
    ],
  },
  {
    id: 6,
    text: "Do you require any special functionalities?",
    answers: [
      { id: 1, text: "Integration with third-party APIs", nextQuestionId: 7 },
      { id: 2, text: "Custom payment gateway", nextQuestionId: 7 },
      { id: 3, text: "Multi-language support", nextQuestionId: 7 },
      // Add more options as needed
    ],
  },
  {
    id: 7,
    text: "What is your timeline for the project?",
    answers: [
      { id: 1, text: "Less than 1 month", nextQuestionId: 8 },
      { id: 2, text: "1-3 months", nextQuestionId: 8 },
      { id: 3, text: "More than 3 months", nextQuestionId: 8 },
      // Add more options as needed
    ],
  },
];

export default Questions;
