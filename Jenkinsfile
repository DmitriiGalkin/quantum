pipeline {

    agent any

    stages {
        stage('Application') {
            steps {
                echo 'Application install & build'
                sh 'cd app && yarn'
                sh 'cd app && npm run build'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
    }
}