pipeline {

    agent any

    stages {
        stage('Application') {
            steps {
                echo 'Application install & build'
                                sh 'ls'
                sh 'cd app'
                sh 'yarn'
                                sh 'ls'
                sh 'cd app'
                sh 'ls'
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