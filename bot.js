const { Probot } = require('probot');
const { exec } = require('child_process');

module.exports = (app) => {
  app.on('pull_request', async (context) => {
    const { action, pull_request } = context.payload;
    const branchName = pull_request.head.ref;
    const repoName = context.payload.repository.name;
    const repoOwner = context.payload.repository.owner.login;
    const sha = pull_request.head.sha;

    if (action === 'opened' || action === 'synchronize') {
      const comment = context.issue({ body: `Deployment in progress for PR #${pull_request.number}` });
      await context.octokit.issues.createComment(comment);

      // Build and run Docker container
      exec(`docker build -t ${repoName}:${sha} .`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error building Docker image: ${stderr}`);
          return;
        }

        exec(`docker run -d --name ${repoName}-${sha} --network pr-deployment-network -p 8080:80 ${repoName}:${sha}`, async (error, stdout, stderr) => {
          if (error) {
            console.error(`Error running Docker container: ${stderr}`);
            return;
          }

          const comment = context.issue({ body: `Deployment successful! Access the deployed environment [here](http://your-server-ip:8080).` });
          await context.octokit.issues.createComment(comment);
        });
      });
    }

    if (action === 'closed') {
      exec(`docker stop ${repoName}-${sha} && docker rm ${repoName}-${sha}`, async (error, stdout, stderr) => {
        if (error) {
          console.error(`Error stopping/removing Docker container: ${stderr}`);
          return;
        }

        const comment = context.issue({ body: `PR #${pull_request.number} closed. Cleaned up resources.` });
        await context.octokit.issues.createComment(comment);
      });
    }
  });
};

// Server setup
const { createNodeMiddleware } = require('probot');
const { createProbot } = require('probot');

const probot = createProbot();
probot.load(require('./bot'));

require('http').createServer(createNodeMiddleware(probot)).listen(3000);
