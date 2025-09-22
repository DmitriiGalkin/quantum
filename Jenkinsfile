pipeline {

    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
                sh 'npm run build'
            }
        }
    }
}