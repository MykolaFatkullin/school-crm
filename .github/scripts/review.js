import fs from "node:fs/promises";
import OpenAI from "openai";
import * as github from "@actions/github";

async function read(path: string) {
    return fs.readFile(path, "utf8");
}

async function main() {
    const apiKey = process.env.OPENAI_API_KEY;
    const githubToken = process.env.GITHUB_TOKEN;
    const eventPath = process.env.GITHUB_EVENT_PATH;

    if (!apiKey) throw new Error("OPENAI_API_KEY is missing.");
    if (!githubToken) throw new Error("GITHUB_TOKEN is missing.");
    if (!eventPath) throw new Error("GITHUB_EVENT_PATH is missing.");

    const event = JSON.parse(await fs.readFile(eventPath, "utf8"));

    const pr = event.pull_request;

    if (!pr) {
        console.log("Not a pull request.");
        return;
    }

    const context = await read(".github/ai/context.md");
    const reviewer = await read(".github/ai/reviewer.md");
    const diff = await read("diff.patch");

    if (!diff.trim()) {
        console.log("Diff is empty.");
        return;
    }

    const openai = new OpenAI({
        apiKey
    });

    const response = await openai.responses.create({
        model: "gpt-5.5",
        input: [
            {
                role: "system",
                content: context
            },
            {
                role: "system",
                content: reviewer
            },
            {
                role: "user",
                content: `
Review the following Git diff.

Only review modified code.

\`\`\`diff
${diff}
\`\`\`
`
            }
        ]
    });

    const review = response.output_text;

    const octokit = github.getOctokit(githubToken);

    const { owner, repo } = github.context.repo;

    const issue_number = pr.number;

    const comments = await octokit.rest.issues.listComments({
        owner,
        repo,
        issue_number
    });

    const marker = "<!-- AI_CODE_REVIEW -->";

    const existing = comments.data.find(
        c =>
            c.user?.type === "Bot" &&
            c.body?.includes(marker)
    );

    const body = `${marker}


${review}`;

    if (existing) {
        await octokit.rest.issues.updateComment({
            owner,
            repo,
            comment_id: existing.id,
            body
        });

        console.log("Updated existing review.");
    } else {
        await octokit.rest.issues.createComment({
            owner,
            repo,
            issue_number,
            body
        });

        console.log("Created review comment.");
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
