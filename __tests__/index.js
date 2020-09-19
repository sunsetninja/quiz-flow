const { createQuizFlow } = require("../src/index.js");
const { question, answer, first } = require("../src/utils.js");

test("flat survey test", () => {
  const flow = [
    question("q1", [answer("q1a1"), answer("q1a2")]),
    question("q2", [answer("q2a1"), answer("q2a2")]),
    question("q3", [answer("q3a1"), answer("q3a2")]),
    question("q4", [answer("q4a1"), answer("q4a2")]),
  ];
  const quizFlow = createQuizFlow();
  const iter = quizFlow(flow, first(flow));

  let nextQuestion = iter.next();
  expect(nextQuestion.value.id).toBe("q1");
  nextQuestion = iter.next("q1a1");
  expect(nextQuestion.value.id).toBe("q2");
  nextQuestion = iter.next("q2a1");
  expect(nextQuestion.value.id).toBe("q3");
  nextQuestion = iter.next("q3a1");
  expect(nextQuestion.value.id).toBe("q4");
  nextQuestion = iter.next("q4a1");
  expect(nextQuestion.done).toBe(true);
});

test("nested survey test #1", () => {
  const flow = [
    question(
      "q1",
      [
        answer("q1a1", [question("q2", [answer("q2a1"), answer("q2a2")])]),
        answer("q1a2", [question("q3", [answer("q3a1"), answer("q3a2")])]),
      ],
      { isHead: true }
    ),
    question("q4", [answer("q4a1"), answer("q4a2")]),
  ];
  const quizFlow = createQuizFlow();
  const iter = quizFlow(flow, first(flow));

  let nextQuestion = iter.next();
  expect(nextQuestion.value.id).toBe("q1");
  nextQuestion = iter.next("q1a1");
  expect(nextQuestion.value.id).toBe("q2");
  nextQuestion = iter.next("q2a1");
  expect(nextQuestion.value.id).toBe("q4");
  nextQuestion = iter.next("q4a1");
  expect(nextQuestion.done).toBe(true);
});

test("nested survey test #2", () => {
  const flow = [
    question(
      "q1",
      [
        answer("q1a1", [question("q2", [answer("q2a1"), answer("q2a2")])]),
        answer("q1a2", [question("q3", [answer("q3a1"), answer("q3a2")])]),
      ],
      { isHead: true }
    ),
    question("q4", [answer("q4a1"), answer("q4a2")]),
  ];
  const quizFlow = createQuizFlow();
  const iter = quizFlow(flow, first(flow));

  let nextQuestion = iter.next();
  expect(nextQuestion.value.id).toBe("q1");
  nextQuestion = iter.next("q1a1");
  expect(nextQuestion.value.id).toBe("q2");
  nextQuestion = iter.next("q2a1");
  expect(nextQuestion.value.id).toBe("q4");
  nextQuestion = iter.next("q4a1");
  expect(nextQuestion.done).toBe(true);
});

test("nested survey test #3 (advanced)", () => {
  const flow = [
    question(
      "q1",
      [
        answer("q1a1", [
          question(
            "q2",
            [
              answer("q2a1", [
                question("q3", [answer("q3a1"), answer("q3a2")]),
                question("q4", [answer("q4a1"), answer("q4a2")]),
              ]),
              answer("q2a2", [
                question("q4", [answer("q4a1"), answer("q4a2")]),
                question("q3", [answer("q3a1"), answer("q3a2")]),
              ]),
            ],
            { isHead: true }
          ),
        ]),
        answer("q1a2", [question("q3", [answer("q3a1"), answer("q3a2")])]),
      ],
      { isHead: true }
    ),
    question("q5", [answer("q5a1"), answer("q5a2")]),
  ];
  const quizFlow = createQuizFlow();
  const iter = quizFlow(flow, first(flow));

  let nextQuestion = iter.next();
  expect(nextQuestion.value.id).toBe("q1");
  nextQuestion = iter.next("q1a1");
  expect(nextQuestion.value.id).toBe("q2");
  nextQuestion = iter.next("q2a1");
  expect(nextQuestion.value.id).toBe("q3");
  nextQuestion = iter.next("q3a1");
  expect(nextQuestion.value.id).toBe("q4");
  nextQuestion = iter.next("q4a1");
  expect(nextQuestion.value.id).toBe("q5");
  nextQuestion = iter.next("q5a2");
  expect(nextQuestion.done).toBe(true);
});

test("nested survey test #4 (with repeated question in flow)", () => {
  const flow = [
    question(
      "q1",
      [
        answer("q1a1", [
          question(
            "q2",
            [
              answer("q2a1", [
                question("q3", [answer("q3a1"), answer("q3a2")]),
              ]),
              answer("q2a2", [
                question("q4", [answer("q4a1"), answer("q4a2")]),
                question("q3", [answer("q3a1"), answer("q3a2")]),
              ]),
            ],
            { isHead: true }
          ),
        ]),
        answer("q1a2", [question("q3", [answer("q3a1"), answer("q3a2")])]),
      ],
      { isHead: true }
    ),
    question("q4", [answer("q4a1"), answer("q4a2")]),
    question("q5", [answer("q5a1"), answer("q5a2")]),
  ];
  const quizFlow = createQuizFlow();
  const iter = quizFlow(flow, first(flow));

  let nextQuestion = iter.next();
  expect(nextQuestion.value.id).toBe("q1");
  nextQuestion = iter.next("q1a1");
  expect(nextQuestion.value.id).toBe("q2");
  nextQuestion = iter.next("q2a1");
  expect(nextQuestion.value.id).toBe("q3");
  nextQuestion = iter.next("q3a1");
  expect(nextQuestion.value.id).toBe("q4");
  nextQuestion = iter.next("q4a1");
  expect(nextQuestion.value.id).toBe("q5");
  nextQuestion = iter.next("q5a2");
  expect(nextQuestion.done).toBe(true);
});

test("nested survey test #5 (with multiple answers)", () => {
  const flow = [
    question(
      "q1",
      [
        answer("q1a1", [
          question(
            "q2",
            [
              answer("q2a1", [
                question("q3", [answer("q3a1"), answer("q3a2")]),
                question("q4", [answer("q4a1"), answer("q4a2")]),
                question("q5", [answer("q5a1"), answer("q5a2")]),
              ]),
              answer("q2a2", [
                question("q4", [answer("q4a1"), answer("q4a2")]),
                question("q3", [answer("q3a1"), answer("q3a2")]),
              ]),
            ],
            { isHead: true }
          ),
        ]),
        answer("q1a2", [question("q3", [answer("q3a1"), answer("q3a2")])]),
      ],
      { isHead: true }
    ),
    question("q5", [answer("q5a1"), answer("q5a2")]),
  ];
  const quizFlow = createQuizFlow();
  const iter = quizFlow(flow, first(flow));

  let nextQuestion = iter.next();
  expect(nextQuestion.value.id).toBe("q1");
  nextQuestion = iter.next("q1a1");
  expect(nextQuestion.value.id).toBe("q2");
  nextQuestion = iter.next(["q2a1", "q2a2"]);
  expect(nextQuestion.value.id).toBe("q3");
  nextQuestion = iter.next("q3a1");
  expect(nextQuestion.value.id).toBe("q4");
  nextQuestion = iter.next("q4a1");
  expect(nextQuestion.value.id).toBe("q5");
  nextQuestion = iter.next("q5a1");
  expect(nextQuestion.value.id).toBe("q4");
  nextQuestion = iter.next("q4a1");
  expect(nextQuestion.value.id).toBe("q3");
  nextQuestion = iter.next("q3a1");
  expect(nextQuestion.value.id).toBe("q5");
  nextQuestion = iter.next("q5a2");
  expect(nextQuestion.done).toBe(true);
});
