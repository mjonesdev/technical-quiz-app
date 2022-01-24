import React, { useState, useEffect } from "react";
import baseURL from "./Request";
import axios from "axios";

export default function Card() {
	const [isLoading, setIsLoading] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	let category = "&linux";
	let difficulty = "&easy";
	let limit = "&limit=5";
	let URL = `${baseURL}${category}${difficulty}${limit}`;

	useEffect(() => {
	async function fetchData() {
		const request = await axios.get(`${URL}`);
		setQuestions(request.data);
		setIsLoading(false);
		return request;
	}
	fetchData();
	}, [URL]);

	const handleAnswerOptionClick = (isCorrect) => {
	console.log(isCorrect);
	console.log(isCorrect === questions[currentQuestion].correct_answer);
	if (isCorrect === questions[currentQuestion].correct_answer) {
		setScore(score + 1);
	}

	const nextQuestion = currentQuestion + 1;
	if (nextQuestion < questions.length) {
		setCurrentQuestion(nextQuestion);
	} else {
		setShowScore(true);
	}
	};

	const questionContent = isLoading ? (
	<div>...Loading</div>
	) : (
	<>
		<div className="question-section">
		<div className="question-count">
			<span>Question {currentQuestion + 1}</span>/{questions.length}
		</div>
		<div className="question-text">
			{questions[currentQuestion].question}
		</div>
		</div>
		<div className="answer-section">
		{Object.keys(questions[currentQuestion].answers).map((answerOption) =>
			questions[currentQuestion].answers[answerOption] === null ? (
			<div></div>
			) : (
			<button onClick={() => handleAnswerOptionClick(answerOption)}>
				{questions[currentQuestion].answers[answerOption]}
			</button>
		)
		)}
		</div>
	</>
	);

	return (
	<div className="app">
		{showScore ? (
		<div className="score-section">
			You scored {score} out of {questions.length}
		</div>
		) : (
		<div>{questionContent}</div>
		)}
	</div>
	);
}