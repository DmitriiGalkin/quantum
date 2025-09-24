pipeline {
    agent any

    stages {
        stage('Application') {
            steps {
                echo 'Application install & build & run'
                sh 'cd app && yarn'
                sh 'cd app && CI=false npm run build'
                sh 'cd app && pm2 start server/index.js -f --name ssr'
            }
        }
        stage('Api for application') {
            steps {
                echo 'API install & run2'
                sh 'cd server && yarn'
                sh 'cd server && pm2 start src/index.js -f --name api'
                sh 'pm2 save'
            }
        }
    }
}