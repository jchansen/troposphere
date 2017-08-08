pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''
          echo "Because I am using the 'Git' Source control in the options above, i know my 1.${GIT_BRANCH} 2.$GIT_BRANCH 3.${BRANCH_NAME}"
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
