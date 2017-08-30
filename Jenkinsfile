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
          rm -rf variables.ini
        '''
        sh '''
          sudo -u postgres createdb troposphere_${BUILD_NUMBER}
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
          sudo cp variables.ini.dist variables.ini
          . env/bin/activate
          sudo ./configure
        '''
        sh '''
          sudo npm install
        '''
      }
    }
    stage('Test') {
      steps {
        sh '''
          . env/bin/activate
          #./manage.py  makemigrations --dry-run --check
        '''
        sh '''
          sudo npm run build
        '''
        sh '''
          sudo npm run lint
        '''
      }
    }
    stage('Deploy') {
      steps {
        ansiblePlaybook(
          playbook: '/opt/ansible/ansible-troposphere/troposphere/playbook.yml',
          inventory: '/etc/ansible/hosts',
          extras: '--extra-vars "host=atmo-dev secrets_git_url=git@gitlab.cyverse.org:atmosphere/atmo-dev.git secrets_path=/opt/dev/atmo-dev clank_git_url=https://github.com/cyverse/clank.git clank_path=/opt/dev/clank clank_virtualenv_path=/opt/dev/clank_env"',
          colorized: true,
          sudo: true
        )
      }
    }
  }
}
