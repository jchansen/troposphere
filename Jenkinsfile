pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''
          echo "Building git branch: ${BRANCH_NAME}"
          whoami
          rm -rf atmo-dev
          rm -rf clank
        '''
        sh '''
          git clone git@gitlab.cyverse.org:atmosphere/atmo-dev.git
        '''
        sh '''
          git clone https://github.com/cyverse/clank.git
        '''
        sh '''
          virtualenv c_env
        '''
        sh '''
          . c_env/bin/activate
          pip install -r clank/requirements.txt
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
