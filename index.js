const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const name = core.getInput('name');
    const org = core.getInput('org');
    const accessToken = core.getInput('access-token');

    const endpoint = org ? `/orgs/${org}/repos` : '/user/repos'
    const repository = await axios.post(
      'https://api.github.com' + endpoint,
      {
        name,
        private: false,
      },
      {
        headers: {
          Authorization: 'token ' + accessToken
        }
      }
    )
    core.info(repository);
    core.setOutput('id', repository.id);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
