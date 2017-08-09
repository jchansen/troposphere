pipeline {
  agent any
  stages {
    stage('Example1') {
      steps {
        expression {env.BRANCH_NAME == 'master' }
        sh '''
          echo "Hello from master..."
        '''
      }
    }
    stage('Example2') {
      steps {
        if (env.BRANCH_NAME == "master") {
          sh '''
            echo "Hello from NOT master..."
          '''
        }
        sh '''
          echo "Work please?"
        '''
      }
    }
    stage('Build') {
      steps {
        sh '''
          echo "Building git branch: ${BRANCH_NAME}"
          whoami
          rm -rf atmo-dev
          rm -rf clank
        '''
        sh '''
          #git clone git@gitlab.cyverse.org:atmosphere/atmo-dev.git
        '''
        sh '''
          #git clone https://github.com/cyverse/clank.git
        '''
        sh '''
          #virtualenv c_env
        '''
        sh '''
          #. c_env/bin/activate
          #pip install -r clank/requirements.txt
        '''
        sh '''
          #virtualenv env
          #. env/bin/activate
          #pip install -r dev_requirements.txt
        '''
        sh '''
          #cp ./variables.ini.dist ./variables.ini
          #./configure
        '''
      }
    }
    stage('Test') {
      steps {
        sh '''
          sudo su
          #. env/bin/activate
          #./manage.py  makemigrations --dry-run --check
          #npm run build
          #npm run lint
        '''
      }
    }
    stage('Deploy') {
      steps {
        sh '''
          echo "Skipping deploy..."
        '''
      }
    }
  }
}
