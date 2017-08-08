pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''
          echo "Because I am using the 'Git' Source control in the options above, i know my ${GIT_BRANCH}"
        '''
        sh '''
          git clone git@gitlab.cyverse.org:atmosphere/atmo-dev.git
        '''
      }
    }
    stage('Test') {
      steps {
        echo 'Skipping test...'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Skipping deploy...'
      }
    }
  }
}
