import type { SurveyResponse } from "./quiz-utils";

interface UserData {
  name: string;
  email: string;
  company: string;
  position: string;
}

export function generateEmailTemplate(
  userData: UserData,
  results: SurveyResponse,
  theme: "light" | "dark" = "light"
): string {
  const isLight = theme === "light";
  const bgColor = isLight ? "#f8f9fa" : "#1a1a1a";
  const containerBg = isLight ? "#ffffff" : "#2d2d2d";
  const textColor = isLight ? "#333333" : "#ffffff";
  const headerBg = isLight ? "#ffffff" : "#000000";
  const chartBg = isLight ? "#f1f1f1" : "#3a3a3a";

  return `
    <!DOCTYPE html>
    <html lang="hu">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Forbes Business Club - Adaptív Vezető Felmérés</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Arial', sans-serif;
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
            .results-summary {
                padding: 30px 40px;
                text-align: center;
                background-color: ${chartBg};
                margin: 0 40px;
                border-radius: 8px;
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
            .response-item {
                margin-bottom: 20px;
                padding: 15px;
                background-color: ${isLight ? "#f8f9fa" : "#3a3a3a"};
                border-radius: 6px;
                border-left: 4px solid #D2691E;
            }
            .question-text {
                font-weight: bold;
                margin-bottom: 8px;
                font-size: 14px;
            }
            .response-text {
                font-size: 13px;
                margin-bottom: 5px;
                color: #D2691E;
                font-weight: bold;
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
                Köszönjük, hogy részt vett az Adaptív Vezető Felmérésben. Az alábbiakban találja az Ön válaszait és személyre szabott értékelését.
            </div>

            <div class="results-summary">
                <div class="score-title">Átlagos értékelés</div>
                <div class="score-value">${results.averageScore}/5</div>
                <div class="score-details">
                    Összesen ${results.totalQuestions} kérdésre adott válasz
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
                <div class="section-title">Az Ön válaszai</div>
                <div class="section-content">
                    ${results.responses
                      .map(
                        (response, index) => `
                        <div class="response-item">
                            <div class="question-text">${index + 1}. ${
                          response.question
                        }</div>
                            <div class="response-text">Az Ön válasza: ${
                              response.responseText
                            }</div>
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
                      results.averageScore >= 4
                        ? "Kiváló eredmény! Ön magas szintű adaptív vezetői képességekkel rendelkezik. Az eredmények azt mutatják, hogy képes alkalmazkodni a változó körülményekhez és hatékonyan vezetni csapatát."
                        : results.averageScore >= 3
                        ? "Jó eredmény! Van még fejlesztési lehetőség az adaptív vezetői készségek terén. Javasoljuk, hogy fókuszáljon azokra a területekre, ahol még van fejlődési potenciál."
                        : "Az eredmények alapján érdemes lehet további fejlesztést végezni az adaptív vezetői kompetenciák területén. Javasoljuk szakmai képzések vagy coaching programok igénybevételét."
                    }
                </div>
            </div>

            <div class="footer">
                Forbes Business Club - Adaptív Vezető Felmérés<br>
                by Viktor Lenartson, Copyright ZEL Group
            </div>
        </div>
    </body>
    </html>
  `;
}
