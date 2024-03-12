/**
 * run the following commands in the terminal
 * 
 * curl -X POST http://localhost:8080/submit
 * 
 * curl "http://localhost:8080/checkstatus?jobId=job:<jobId>"
 */

const app = require("express")();
const jobs = {};

app.post("/submit", (req, res) => {
    const jobId = `job:${Date.now()}`;
    jobs[jobId] = 0;
    updateJob(jobId, 0);
    res.end("\n\n" + jobId + "\n\n");
});

app.get("/checkstatus", (req, res) => {
    console.log(jobs[req.query.jobId]);
    res.end("\n\nJobStatus: " + jobs[req.query.jobId] + "%\n\n");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

function updateJob(jobId, progress) {
    jobs[jobId] = progress;
    console.log(`updated ${jobId} to ${progress}`);
    if (progress == 100) {
        return ;
    } 
    this.setTimeout(()=> updateJob(jobId, progress + 10), 3000);
}