from flask import Flask, request, jsonify
import subprocess
import requests

app = Flask(__name__)

GITHUB_TOKEN = 'this is not the token'  # Replace with your GitHub token

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    if 'action' in data and data['action'] == 'opened' and 'pull_request' in data:
        pr_number = data['pull_request']['number']
        repo_name = data['repository']['full_name']
        comment_url = f"https://api.github.com/repos/{repo_name}/issues/{pr_number}/comments"

        # Notify stakeholders (comment on the PR)
        notify_stakeholders(comment_url, "Deployment started for this pull request.")

        # Run the deployment script
        deployment_success = run_deployment_script()

        # Notify stakeholders with the result
        if deployment_success:
            notify_stakeholders(comment_url, "Deployment successful. [Deployed application](http://46.101.11.165:5173).")
        else:
            notify_stakeholders(comment_url, "Deployment failed. Please check the logs.")

        return jsonify({'message': 'Deployment processed'}), 200
    return jsonify({'message': 'No action taken'}), 200

def notify_stakeholders(comment_url, message):
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3+json'
    }
    data = {'body': message}
    response = requests.post(comment_url, headers=headers, json=data)
    if response.status_code != 201:
        print(f"Failed to comment on PR: {response.json()}")

def run_deployment_script():
    try:
        result = subprocess.run(['./deploy.sh'], check=True, capture_output=True, text=True)
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Deployment script failed with error: {e.stderr}")
        return False

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
