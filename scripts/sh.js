const exec = require('child_process').execSync

function sh(command, echo = true) {
  try {
    if (echo) {
      console.log(`> ${command}`)
    }
    const out = exec(command, { stdio: 'inherit' })
  } catch (e) {}
}

module.exports = {
  sh
}
