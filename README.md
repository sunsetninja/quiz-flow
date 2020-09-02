# Quiz flow

## Генератор флоу

- создается через `createQuizFlow`
- нужен для того, чтобы продвигаться по флоу опроса
- на первом шаге возвращает вопрос, переданный как аргумент (по умолчанию - первый вопрос в аргументе `questions`)
- возвращаемый итератор принимает ответ(со второго шага) и возвращает структуру `{ value: NextQuestion, done: false }`, `NextQuestion` определяется по [алгоритму](#алгоритм-поиска-следующего-вопроса)
- множественный ответ обрабатывается, как несколько ответов на один вопрос последовательно (сначала все вопросы из первого ответа и так до последнего ответа)
- когда вопроcы кончаются итератор возвращает структуру `{ value: null || TERMINATE, done: true }`

## Пример использования флоу

```js
const quizFlow = createQuizFlow();
const iter = quizFlow(data.questions, data.questions[0]);

let question;
// question = iter.next(answer)
question = iter.next();
question = iter.next(101);
question = iter.next(1001);
question = iter.next(2001);
question = iter.next(3001);
question = iter.next(3001);
question = iter.next(300121);
question = iter.next(4001);
question = iter.next(201);
// для множественного выбора передаем массив, в качестве ответа
question = iter.next([20111, 20112]);
question = iter.next(2011111);
question = iter.next(2011122);
question = iter.next(2011211);
question = iter.next(2011222);
question = iter.next(301);
```

`quizFlow.getPath()` вернет весь пройденный [путь](#путь) по флоу

## Сущности

### Путь

Коллекция пар (вопрос,ответ) которые уже пройдены

```js
[
  { question: 100, answer: 102 },
  { question: 200, answer: [201, 202] },
];
```

Валидность пути можно определить при помощи `isPathValid` (предикат)

### Question

```ts
  {
    "id": number | string,
    "isHead": boolean, // определяет влияет ли ответ на вопрос на флоу опроса
    "title": string,
    "answers": Array<Answer>
  }
```

### Answer

```ts
  {
    "id": number | string,
    "title": string,
    "isTerminate": boolean, // приводит ли данный ответ к окончанию всего флоу
    "questions"?: Array<Question> // определяет вопросы, которые будут следующими при этом ответе
  }
```

## Алгоритм поиска следующего вопроса

> для определения следующего вопроса нужна вся коллекция вопросов и текущий путь

- Если текущий вопрос `isHead`, берем первый вопрос из `questions` данного на вопрос ответа
- Если текущий вопрос не последний в своей коллекции, то берем следующий вопрос
- Если текущий вопрос последний в своей коллекции - берем следующий вопрос из ближайшей коллекции выше
- Опрос заканчивается, если следующего вопроса нет или в ответах присутствует с `isTerminate: true`
