// document.getElementById("playBtn").onclick = function () {
//     fetch("http://127.0.0.1:8080", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//     .then(responce => responce.json())
//     .then(data => {
//         if (data.error) {
//             alert(data.error);
//             return;
//         };

//         document.getElementById("result").textContent = data.outcome;
//         document.getElementById("balance").textContent = "Баланс: " + data.balance;
//     })
//     .catch(err => console.error("Ошибка: ", err));
// }
const http = require("http");

const WIN_CHANCE = 0.1;
const WIN_REWARD = 100;
const GAME_COST = 10;


let userBalance = 100;
http.createServer((req, res) => {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204)
        res.end();
        return;
    }

    if (req.method === "POST") {
        try {
            if (userBalance < GAME_COST) {
                    res.writeHead(400, { "content-type": "application/json" })
                    res.end(JSON.stringify({ error: "Деняг нема!"}));
                    return;
                };
            
            const win = Math.random() < WIN_CHANCE;
            const reward = win ? WIN_REWARD : 0;
            
            userBalance = userBalance - GAME_COST + reward;

            const result = {
                balance: userBalance,
                outcome: win ? "🎉 WIN!" : "💀 LOSE!",
                reward: reward,
            };
        
        
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify(result));
        } catch (err) {
            console.error("An error occurred: ", err.message);
            res.writeHead(400);
            res.end("An error occurred: ", err.message);
        }
    }}).listen(8080, "127.0.0.1", () => console.log("Server running on port 8080"));