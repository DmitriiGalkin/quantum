pipeline {

    agent any

    stages {
        stage('Application') {
            steps {
                echo 'Application install & build'
                sh 'cd app'
                sh 'yarn'
                sh 'cd app'
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
    }
}