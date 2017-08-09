pipeline {
  agent any
  stages {
    stage('Example: branch == master') {
      when {
        expression {
          env.BRANCH_NAME == 'master'
        }
      }
      steps {
        sh '''
          echo "Hello from master..."
        '''
      }
    }
    stage('Example: branch == jenkins') {
      when {
        expression {
          env.BRANCH_NAME == 'jenkins'
        }
      }
      steps {
        sh '''
          echo "Hello from jenkins..."
        '''
      }
    }
    stage('Example: branch is NOT master') {
      when {
        expression {
          env.BRANCH_NAME != 'master'
        }
      }
      steps {
        sh '''
          echo "Hello from NOT master..."
        '''
      }
    }
    stage('Build') {
      steps {
        sh '''
          sudo su
          echo "Building git branch: ${BRANCH_NAME}"
          whoami
          rm -rf atmo-dev
          rm -rf clank
        '''
        sh '''
          sudo su
          git clone git@gitlab.cyverse.org:atmosphere/atmo-dev.git
        '''
        sh '''
          sudo su
          git clone https://github.com/cyverse/clank.git
        '''
        sh '''
          sudo su
          virtualenv c_env
        '''
        sh '''
          sudo su
          . c_env/bin/activate
          pip install -r clank/requirements.txt
        '''
        sh '''
          sudo su
          virtualenv env
          . env/bin/activate
          pip install -r dev_requirements.txt
        '''
        sh '''
          sudo su
          cp ./variables.ini.dist ./variables.ini
          ./configure
        '''
      }
    }
    stage('Test') {
      steps {
        sh '''
          sudo su
          . env/bin/activate
          ./manage.py  makemigrations --dry-run --check
          npm run build
          npm run lint
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
