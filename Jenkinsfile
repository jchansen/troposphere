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
          #sudo su
          #. env/bin/activate
          #./manage.py  makemigrations --dry-run --check
          #npm run build
          #npm run lint
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
