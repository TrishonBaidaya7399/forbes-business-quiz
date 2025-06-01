import { QuizResult } from "./quiz-utils";

interface UserData {
  name: string;
  email: string;
  company: string;
  position: string;
}

export function generateEmailTemplate(
  userData: UserData,
  results: QuizResult,
  theme: "light" | "dark" = "light"
): string {
  const getOptionText = (
    options: Array<{ id: string; text: string }>,
    optionId: string
  ) => {
    const option = options.find((opt) => opt.id === optionId);
    return option ? option.text : optionId;
  };

  const isLight = theme === "light";
  const bgColor = isLight ? "#f8f9fa" : "#1a1a1a";
  const containerBg = isLight ? "#ffffff" : "#2d2d2d";
  const textColor = isLight ? "#333333" : "#ffffff";
  const headerBg = isLight ? "#ffffff" : "#000000";
  const chartBg = isLight ? "#f1f1f1" : "#3a3a3a";

  // Generate chart data for visualization
  const chartData = results.answers.map((answer, index) => ({
    question: index + 1,
    score: answer.isCorrect ? 100 : 0,
    height: answer.isCorrect ? 80 : 40,
  }));

  return `
    <!DOCTYPE html>
    <html lang="hu">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Forbes Business Club - Adaptív Vezető Kutatás</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
               font-family: 'Didot', 'Playfair Display', 'Georgia', serif;
                background-color: ${bgColor};
                color: ${textColor};
                line-height: 1.6;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background-color: ${containerBg};
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                background-color: ${headerBg};
                padding: 40px 20px;
                text-align: center;
                border-bottom: 1px solid ${isLight ? "#e0e0e0" : "#444"};
            }
            .logo {
                font-size: 18px;
                font-weight: normal;
                color: ${textColor};
                margin-bottom: 5px;
            }
            .business-club {
                font-size: 24px;
                font-weight: bold;
                color: ${textColor};
                letter-spacing: 2px;
            }
            .greeting {
                padding: 30px 40px 20px;
                font-size: 24px;
                font-weight: bold;
                color: ${textColor};
            }
            .intro-text {
                padding: 0 40px 30px;
                font-size: 14px;
                color: ${textColor};
                opacity: 0.8;
            }
            .chart-container {
                padding: 20px 40px;
                background-color: ${chartBg};
                margin: 0 40px;
                border-radius: 8px;
            }
            .chart {
                display: flex;
                align-items: end;
                justify-content: space-between;
                height: 200px;
                margin: 20px 0;
                padding: 0 20px;
            }
            .bar {
                background: linear-gradient(to top, #8B4513, #D2691E);
                width: 40px;
                margin: 0 5px;
                border-radius: 4px 4px 0 0;
                position: relative;
            }
            .bar-label {
                position: absolute;
                bottom: -25px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 12px;
                color: ${textColor};
                opacity: 0.7;
            }
            .results-summary {
                padding: 30px 40px;
                text-align: center;
            }
            .score-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
                color: ${textColor};
            }
            .score-value {
                font-size: 36px;
                font-weight: bold;
                color: #D2691E;
                margin-bottom: 15px;
            }
            .score-details {
                font-size: 14px;
                color: ${textColor};
                opacity: 0.8;
            }
            .section {
                padding: 20px 40px;
                border-bottom: 1px solid ${isLight ? "#e0e0e0" : "#444"};
            }
            .section-title {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 15px;
                color: ${textColor};
            }
            .section-content {
                font-size: 14px;
                color: ${textColor};
                opacity: 0.9;
                line-height: 1.8;
            }
            .question-result {
                margin-bottom: 20px;
                padding: 15px;
                background-color: ${isLight ? "#f8f9fa" : "#3a3a3a"};
                border-radius: 6px;
                border-left: 4px solid ${isLight ? "#28a745" : "#4CAF50"};
            }
            .question-result.incorrect {
                border-left-color: ${isLight ? "#dc3545" : "#f44336"};
            }
            .question-text {
                font-weight: bold;
                margin-bottom: 8px;
                font-size: 14px;
            }
            .answer-text {
                font-size: 13px;
                margin-bottom: 5px;
            }
            .footer {
                padding: 30px 40px;
                text-align: center;
                font-size: 12px;
                color: ${textColor};
                opacity: 0.6;
                border-top: 1px solid ${isLight ? "#e0e0e0" : "#444"};
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Forbes</div>
                <div class="business-club">BUSINESS CLUB</div>
            </div>

            <div class="greeting">Kedves ${userData.name}!</div>
            
            <div class="intro-text">
                Köszönjük, hogy részt vett az Adaptív Vezető Kutatásban. Az alábbiakban találja az Ön személyre szabott értékelését az adaptív vezető felmérés alapján.
            </div>

            <div class="chart-container">
                <div class="chart">
                    ${chartData
                      .map(
                        (data, index) => `
                        <div class="bar" style="height: ${data.height}px;">
                            <div class="bar-label">${data.question}</div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>

            <div class="results-summary">
                <div class="score-title">A felmérés kitöltése</div>
                <div class="score-value">${results.percentage}%</div>
                <div class="score-details">
                    Összesen ${results.totalQuestions} kérdésből ${
    results.correctAnswers
  } helyes válasz<br>
                    Helyes válaszok: ${
                      results.correctAnswers
                    } | Helytelen válaszok: ${results.wrongAnswers}
                </div>
            </div>

            <div class="section">
                <div class="section-title">Személyes adatok</div>
                <div class="section-content">
                    <strong>Név:</strong> ${userData.name}<br>
                    <strong>Cégnév:</strong> ${userData.company}<br>
                    <strong>Pozíció:</strong> ${userData.position}<br>
                    <strong>E-mail:</strong> ${userData.email}
                </div>
            </div>

            <div class="section">
                <div class="section-title">Részletes eredmények</div>
                <div class="section-content">
                    ${results.answers
                      .map(
                        (answer, index) => `
                        <div class="question-result ${
                          answer.isCorrect ? "correct" : "incorrect"
                        }">
                            <div class="question-text">${index + 1}. ${
                          answer.question
                        }</div>
                            <div class="answer-text"><strong>Az Ön válasza:</strong> ${getOptionText(
                              answer.options,
                              answer.userAnswer
                            )}</div>
                            ${
                              !answer.isCorrect
                                ? `<div class="answer-text"><strong>Helyes válasz:</strong> ${getOptionText(
                                    answer.options,
                                    answer.correctAnswer
                                  )}</div>`
                                : ""
                            }
                            <div class="answer-text" style="color: ${
                              answer.isCorrect ? "#28a745" : "#dc3545"
                            }; font-weight: bold;">
                                ${
                                  answer.isCorrect
                                    ? "✓ Helyes válasz"
                                    : "✗ Helytelen válasz"
                                }
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>

            <div class="section">
                <div class="section-title">Értékelés</div>
                <div class="section-content">
                    ${
                      results.percentage >= 80
                        ? "Kiváló eredmény! Ön magas szintű adaptív vezetői képességekkel rendelkezik. Az eredmények azt mutatják, hogy képes alkalmazkodni a változó körülményekhez és hatékonyan vezetni csapatát."
                        : results.percentage >= 60
                        ? "Jó eredmény! Van még fejlesztési lehetőség az adaptív vezetői készségek terén. Javasoljuk, hogy fókuszáljon azokra a területekre, ahol még van fejlődési potenciál."
                        : "Az eredmények alapján érdemes lehet további fejlesztést végezni az adaptív vezetői kompetenciák területén. Javasoljuk szakmai képzések vagy coaching programok igénybevételét."
                    }
                </div>
            </div>

            <div class="footer">
                Forbes Business Club - Adaptív Vezető Kutatás<br>
                by Viktor Lenartson, Copyright ZEL Group
            </div>
        </div>
    </body>
    </html>
  `;
}

// Function to generate both light and dark versions
export function generateBothEmailTemplates(
  userData: UserData,
  results: QuizResult
) {
  return {
    light: generateEmailTemplate(userData, results, "light"),
    dark: generateEmailTemplate(userData, results, "dark"),
  };
}
