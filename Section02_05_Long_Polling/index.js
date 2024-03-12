/**
 * run the following commands in the terminal
 * 
 * curl -X POST http://localhost:8080/submit
 * 
 * curl "http://localhost:8080/checkstatus?jobId=job:<jobId>"
 * 
 * Polling은 요청을 보낼 때마다 클라이언트가 얼마나 완료되었는지 응답을 받습니다.
 * 반면, Long Polling은 서버에서 응답을 보내지 않고 클라이언트가 요청을 보낼 때까지 기다립니다.
 */

const app = require("express")();
const jobs = {};

app.post("/submit", (req, res) => {
    const jobId = `job:${Date.now()}`;
    jobs[jobId] = 0;
    updateJob(jobId, 0);
    res.end("\n\n" + jobId + "\n\n");
});

app.get("/checkstatus", async (req, res) => {
    console.log(jobs[req.query.jobId]);
    // Long Polling don't response until done
    while (await checkJobComplete(req.query.jobId) == false);
    res.end("\n\nJobStatus: " + jobs[req.query.jobId] + "%\n\n");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

async function checkJobComplete(jobId) {
    return new Promise((resolve, reject) => {
        if (jobs[jobId] < 100) {
            setTimeout(() => resolve(false), 1000);
        } else {
            resolve();
        }
    });
}

function updateJob(jobId, progress) {
    jobs[jobId] = progress;
    console.log(`updated ${jobId} to ${progress}`);
    if (progress == 100) {
        return ;
    } 
    this.setTimeout(()=> updateJob(jobId, progress + 10), 3000);
}