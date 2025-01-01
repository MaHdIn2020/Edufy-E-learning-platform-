import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const quizzes = {
  CSE: [
    "What is the difference between a stack and a queue in data structures?",
    "Explain the concept of object-oriented programming.",
    "What are the primary components of a computer system?",
    "How does a binary search algorithm work?",
    "What is the role of a compiler in programming?",
  ],

  EEE: [
    "What is Ohm's Law, and how is it applied in circuits?",
    "Explain the working principle of a transformer.",
    "What are the differences between AC and DC current?",
    "What is the purpose of a diode in an electrical circuit?",
    "How does a three-phase power system work?",
  ],
  BBA: [
    "What are the four P's of marketing?",
    "Explain the concept of SWOT analysis.",
    "What is the significance of organizational behavior in management?",
    "How do financial statements help in decision-making?",
    "What is the role of leadership in organizational success?",
  ],

  ECE: [
    "What is the difference between analog and digital signals?",
    "How does amplitude modulation work?",
    "What are the key layers in the OSI model?",
    "What is the function of a microcontroller?",
    "Explain the principle of operation of a satellite communication system.",
  ],

  PHA: [
    "What are the different phases of drug development?",
    "Explain the mechanism of action of antibiotics.",
    "What is the difference between pharmacokinetics and pharmacodynamics?",
    "How are vaccines developed and tested?",
    "What is the role of a pharmacist in healthcare?",
  ],

  MTH: [
    "What is the Pythagorean theorem?",
    "Explain the concept of limits in calculus.",
    "What are the properties of a matrix in linear algebra?",
    "How do you calculate the area of a circle?",
    "What is the difference between permutations and combinations?",
  ],

  PHY: [
    "What are Newton's three laws of motion?",
    "Explain the concept of wave-particle duality.",
    "How is kinetic energy calculated?",
    "What is the principle of conservation of momentum?",
    "What is the difference between scalar and vector quantities?",
  ],

  HIS: [
    "What were the major causes of World War I?",
    "Explain the significance of the Industrial Revolution.",
    "Who were the key figures in the American Civil Rights Movement?",
    "What was the impact of colonization on indigenous cultures?",
    "Describe the events leading to the fall of the Roman Empire.",
  ],

  ENG: [
    "What are the key elements of a narrative essay?",
    "Explain the difference between active and passive voice.",
    "What is the purpose of a thesis statement in an essay?",
    "How do you identify the main theme in a poem?",
    "What are the common figures of speech used in English literature?",
  ],

  PSY: [
    "What is the difference between classical and operant conditioning?",
    "How do psychologists define intelligence?",
    "What are the stages of human development according to Erik Erikson?",
    "What is the role of the prefrontal cortex in decision-making?",
    "How is stress measured and managed in psychological studies?",
  ],
};

const mcqQuestions = {
  CSE: [
    {
      question: "What is the difference between a stack and a queue?",
      options: ["FILO and FIFO", "LIFO and FIFO", "FIFO and LIFO", "None"],
      correct: "LIFO and FIFO",
    },
    {
      question: "Explain OOP concepts.",
      options: [
        "Abstraction, Inheritance",
        "Encapsulation",
        "All of these",
        "None",
      ],
      correct: "All of these",
    },
    {
      question: "What is the purpose of a binary search tree?",
      options: [
        "Efficiently store and retrieve data",
        "To represent hierarchical relationships",
        "Both A and B",
        "None of the above",
      ],
      correct: "Both A and B",
    },
    {
      question: "What is the time complexity of insertion in a linked list?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correct: "O(1)",
    },
    {
      question: "What is recursion?",
      options: [
        "A function that calls itself",
        "A loop that repeats a set of instructions",
        "A data structure for storing key-value pairs",
        "None of the above",
      ],
      correct: "A function that calls itself",
    },
  ],
  EEE: [
    {
      question: "What is Ohm's Law?",
      options: [
        "Voltage = Resistance / Current",
        "Current = Voltage / Resistance",
        "Power = Voltage x Current",
        "None",
      ],
      correct: "Current = Voltage / Resistance",
    },
    {
      question: "What is the unit of power?",
      options: ["Ampere", "Volt", "Watt", "Ohm"],
      correct: "Watt",
    },
    {
      question: "What is the purpose of a transformer?",
      options: [
        "To step up or step down voltage",
        "To convert AC to DC",
        "To store electrical energy",
        "None of the above",
      ],
      correct: "To step up or step down voltage",
    },
    {
      question: "What are the three main types of semiconductors?",
      options: [
        "N-type, P-type, Intrinsic",
        "Conductor, Insulator, Semiconductor",
        "Diode, Transistor, Resistor",
        "None of the above",
      ],
      correct: "N-type, P-type, Intrinsic",
    },
    {
      question: "What is the difference between AC and DC current?",
      options: [
        "AC current changes direction periodically, DC current flows in one direction",
        "AC current is more powerful than DC current",
        "AC current is used in batteries, DC current is used in household appliances",
        "None of the above",
      ],
      correct:
        "AC current changes direction periodically, DC current flows in one direction",
    },
  ],
  BBA: [
    {
      question: "What are the four Ps of marketing?",
      options: [
        "Product, Price, Place, Promotion",
        "People, Planet, Profit, Partnership",
        "Planning, Production, Pricing, Promotion",
        "People, Process, Physical Evidence, Productivity",
      ],
      correct: "Product, Price, Place, Promotion",
    },
    {
      question: "What is the primary goal of financial management?",
      options: [
        "Maximizing shareholder wealth",
        "Minimizing expenses",
        "Increasing sales revenue",
        "Maintaining a positive cash flow",
      ],
      correct: "Maximizing shareholder wealth",
    },
    {
      question:
        "Which type of business ownership has limited liability for its owners?",
      options: [
        "Sole Proprietorship",
        "Partnership",
        "Corporation",
        "All of the above",
      ],
      correct: "Corporation",
    },
    {
      question:
        "What is the term for the process of identifying, assessing, and responding to the risks that could affect an organization?",
      options: [
        "Risk management",
        "Strategic planning",
        "Market research",
        "Human resource management",
      ],
      correct: "Risk management",
    },
    {
      question: "What is the primary function of human resource management?",
      options: [
        "Managing the company's finances",
        "Developing and maintaining a skilled workforce",
        "Marketing the company's products",
        "Overseeing production operations",
      ],
      correct: "Developing and maintaining a skilled workforce",
    },
  ],
  ECE: [
    {
      question: "Which of the following is NOT a type of modulation technique?",
      options: [
        "Amplitude Modulation (AM)",
        "Frequency Modulation (FM)",
        "Phase Modulation (PM)",
        "Digital Modulation",
      ],
      correct: "Digital Modulation",
    },
    {
      question: "What is the primary function of an op-amp?",
      options: [
        "Amplify signals",
        "Generate AC signals",
        "Store electrical energy",
        "Convert AC to DC",
      ],
      correct: "Amplify signals",
    },
    {
      question: "What does VLSI stand for?",
      options: [
        "Very Large Scale Integration",
        "Very Low Scale Integration",
        "Variable Logic Scale Integration",
        "Virtual Logic System Integration",
      ],
      correct: "Very Large Scale Integration",
    },
    {
      question: "What is the purpose of an antenna in communication systems?",
      options: [
        "To transmit and receive electromagnetic waves",
        "To amplify signals",
        "To filter signals",
        "To convert AC to DC",
      ],
      correct: "To transmit and receive electromagnetic waves",
    },
    {
      question: "Which of the following is NOT a type of digital logic gate?",
      options: ["AND", "OR", "XOR", "Resistor"],
      correct: "Resistor",
    },
  ],
  PHA: [
    {
      question: "What is the primary function of the liver in drug metabolism?",
      options: ["Absorption", "Distribution", "Excretion", "Biotransformation"],
      correct: "Biotransformation",
    },
    {
      question:
        "What is the term for the study of drug interactions with living systems?",
      options: [
        "Pharmacology",
        "Pharmaceutics",
        "Pharmacodynamics",
        "Pharmacokinetics",
      ],
      correct: "Pharmacology",
    },
    {
      question:
        "Which route of administration provides the fastest onset of action?",
      options: ["Oral", "Intramuscular", "Subcutaneous", "Intravenous"],
      correct: "Intravenous",
    },
    {
      question: "What are the four stages of pharmacokinetics?",
      options: [
        "Absorption, Distribution, Metabolism, Excretion",
        "Absorption, Distribution, Metabolism, Elimination",
        "Absorption, Distribution, Metabolism, Elimination",
        "Absorption, Distribution, Metabolism, Excretion",
      ],
      correct: "Absorption, Distribution, Metabolism, Excretion",
    },
    {
      question: "What is the term for the undesirable effects of a drug?",
      options: [
        "Therapeutic effects",
        "Side effects",
        "Adverse drug reactions",
        "All of the above",
      ],
      correct: "Adverse drug reactions",
    },
  ],
  MTH: [
    {
      question: "What is the derivative of f(x) = x^2?",
      options: ["x", "2x", "x^3/3", "0"],
      correct: "2x",
    },
    {
      question: "What is the integral of sin(x) dx?",
      options: ["cos(x) + C", "-cos(x) + C", "sin(x) + C", "tan(x) + C"],
      correct: "-cos(x) + C",
    },
    {
      question: "What is the slope of the line 2x + 3y = 6?",
      options: ["-2/3", "2/3", "3/2", "-3/2"],
      correct: "-2/3",
    },
    {
      question: "What is the value of pi (π) to two decimal places?",
      options: ["3.14", "3.15", "3.16", "3.17"],
      correct: "3.14",
    },
    {
      question: "What is the solution to the equation 2x + 5 = 11?",
      options: ["2", "3", "4", "5"],
      correct: "3",
    },
  ],
  PHY: [
    {
      question: "What is the SI unit of force?",
      options: ["Newton (N)", "Joule (J)", "Watt (W)", "Kilogram (kg)"],
      correct: "Newton (N)",
    },
    {
      question:
        "Which law states that for every action, there is an equal and opposite reaction?",
      options: [
        "Newton's First Law",
        "Newton's Second Law",
        "Newton's Third Law",
        "Law of Conservation of Energy",
      ],
      correct: "Newton's Third Law",
    },
    {
      question: "What is the speed of light in a vacuum?",
      options: ["3 x 10^8 m/s", "3 x 10^6 m/s", "3 x 10^4 m/s", "3 x 10^2 m/s"],
      correct: "3 x 10^8 m/s",
    },
    {
      question: "What is the unit of electrical charge?",
      options: ["Volt (V)", "Ampere (A)", "Coulomb (C)", "Ohm (Ω)"],
      correct: "Coulomb (C)",
    },
    {
      question: "Which type of lens converges light rays?",
      options: ["Concave lens", "Convex lens", "Plane mirror", "Prism"],
      correct: "Convex lens",
    },
  ],
  HIS: [
    {
      question: "When did World War II begin?",
      options: ["1914", "1939", "1941", "1945"],
      correct: "1939",
    },
    {
      question: "Who was the first president of the United States?",
      options: [
        "George Washington",
        "Thomas Jefferson",
        "Abraham Lincoln",
        "John Adams",
      ],
      correct: "George Washington",
    },
    {
      question:
        "What is the name of the ancient civilization that built the pyramids?",
      options: ["Roman", "Greek", "Egyptian", "Mayan"],
      correct: "Egyptian",
    },
    {
      question: "The Renaissance was a period of renewed interest in what?",
      options: ["Religion", "Science and Art", "Warfare", "Trade"],
      correct: "Science and Art",
    },
    {
      question: "The Industrial Revolution began in which country?",
      options: ["France", "Germany", "Great Britain", "United States"],
      correct: "Great Britain",
    },
  ],
  ENG: [
    {
      question: "What is the primary function of a noun?",
      options: [
        "To express an action",
        "To describe a noun",
        "To name a person, place, thing, or idea",
        "To connect words in a sentence",
      ],
      correct: "To name a person, place, thing, or idea",
    },
    {
      question: "Which part of speech is the word 'quickly'?",
      options: ["Noun", "Verb", "Adjective", "Adverb"],
      correct: "Adverb",
    },
    {
      question: "What is the purpose of a metaphor?",
      options: [
        "To directly compare two things",
        "To use figurative language to create vivid imagery",
        "To ask a question",
        "To give a command",
      ],
      correct: "To use figurative language to create vivid imagery",
    },
    {
      question: "What is the main idea of a literary text called?",
      options: ["Theme", "Plot", "Character", "Setting"],
      correct: "Theme",
    },
    {
      question: "Which of the following is an example of a pronoun?",
      options: ["Quickly", "Happy", "Run", "He"],
      correct: "He",
    },
  ],
  PSY: [
    {
      question:
        "What is the term for the unconscious mind as described by Sigmund Freud?",
      options: ["Id", "Ego", "Superego", "Conscious"],
      correct: "Id",
    },
    {
      question: "Which type of learning involves associating two stimuli?",
      options: [
        "Classical Conditioning",
        "Operant Conditioning",
        "Observational Learning",
        "Cognitive Learning",
      ],
      correct: "Classical Conditioning",
    },
    {
      question:
        "What is the term for the tendency to interpret ambiguous situations in a way that confirms existing beliefs?",
      options: [
        "Confirmation Bias",
        "Self-serving Bias",
        "Fundamental Attribution Error",
        "Cognitive Dissonance",
      ],
      correct: "Confirmation Bias",
    },
    {
      question:
        "Which psychological perspective emphasizes the role of thoughts and beliefs in shaping behavior?",
      options: ["Psychoanalytic", "Behavioral", "Cognitive", "Humanistic"],
      correct: "Cognitive",
    },
    {
      question: "What are the two major divisions of the nervous system?",
      options: [
        "Central and Peripheral",
        "Sympathetic and Parasympathetic",
        "Somatic and Autonomic",
        "Central and Autonomic",
      ],
      correct: "Central and Peripheral",
    },
  ],
  // Add similar mcq objects for other subjects
};

const Quizzes = () => {
  const { user } = useContext(AuthContext);
  const { state: course_code } = useLocation();
  const [quizType, setQuizType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [marks, setMarks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 5 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, timeLeft]);

  const handleQuizStart = () => {
    if (quizType === "mcq") {
      setQuestions(mcqQuestions[course_code] || []);
    } else {
      setQuestions(quizzes[course_code] || []);
    }
    setQuizStarted(true);

    if (quizStarted) setTimeLeft(60);
  };

  const handleAnswerChange = (index, answer) => {
    setUserAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleSubmit = () => {
    if (quizType === "mcq") {
      let correctAnswers = 0;
      questions.forEach((q, index) => {
        if (q.correct === userAnswers[index]) {
          correctAnswers++;
        }
      });
      setMarks(correctAnswers);
      Swal.fire({
        title: `Congratulaltions ${user.displayName} Quiz Completed!`,
        text: `You scored ${correctAnswers} out of ${questions.length}.`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: `Congratulaltions ${user.displayName} Quiz Completed!`,
        text: "Marks will be published later for the written quiz.",
        icon: "info",
      });
    }
    setQuizStarted(false);
    setTimeLeft(60);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Quiz for <span className="text-green-600">{course_code}</span>
      </h1>
      {!quizStarted && (
        <div>
          <p>
            Select Quiz Type:{" "}
            <span className="text-green-600 font-bold">
              {quizType && quizType}
            </span>
          </p>
          <button
            className="btn btn-primary mr-2"
            onClick={() => setQuizType("mcq")}
          >
            MCQ Quiz
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setQuizType("written")}
          >
            Written Quiz
          </button>
          <button
            className="btn btn-success mt-4 ml-2"
            onClick={handleQuizStart}
            disabled={!quizType}
          >
            Start Quiz
          </button>
        </div>
      )}

      {quizStarted && timeLeft > 0 && (
        <div>
          <p className="text-lg font-bold">
            Time Left: <span className="text-red-500">{timeLeft}</span> seconds
          </p>
          {questions.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold text-blue-600">
                Q{index + 1}: {q.question}
              </p>
              {quizType === "mcq" ? (
                <div>
                  {q.options.map((option, optIndex) => (
                    <div key={optIndex}>
                      <label>
                        <input
                          type="radio"
                          className="mr-3"
                          name={`question-${index}`}
                          value={option}
                          onChange={() => handleAnswerChange(index, option)}
                          disabled={timeLeft <= 0}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="font-bold text-blue-600">{q}</div>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    disabled={timeLeft <= 0}
                  ></textarea>
                </div>
              )}
            </div>
          ))}
          <button
            className="btn btn-danger mt-4"
            onClick={handleSubmit}
            disabled={timeLeft <= 0}
          >
            Submit Quiz
          </button>
        </div>
      )}

      {timeLeft <= 0 && quizStarted && (
        <div className="mt-4">
          <p className="text-red-600">Time is up! The quiz has ended.</p>
          <button className="btn btn-danger" onClick={handleSubmit}>
            View Results
          </button>
        </div>
      )}

      {!quizStarted && questions.length === 0 && (
        <p>No questions available for this course.</p>
      )}

      {marks > 0 && quizType === "mcq" && (
        <div className="mt-4">
          <h1>{user.displayName}</h1>
          <h2 className="text-xl font-bold">Results</h2>
          <p>
            You scored {marks} out of {questions.length}.
          </p>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
