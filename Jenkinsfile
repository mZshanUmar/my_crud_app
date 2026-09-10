pipeline {
    agent {
        node {
            label ''
            customWorkspace "${JOB_NAME}"
        }
    }

    environment {
        // Git Variables
        GIT_REPO        = "git@github.com:mZshanUmar/my_crud_app.git"
        BRANCH          = "main"
        LOCAL_APP_DIR   = "."
        IMAGE_TAG       = "${BUILD_NUMBER}"
        // AWS Variables
        AWS_CREDS       = credentials('aws_personal')
        AWS_REGION      = "us-east-1"
        // EC2 / SSH
        EC2_REMOTE_USER = "ec2-user"
        REMOTE_APP_DIR  = "my_crud_app"
        SSH_KEY_PATH    = "/tmp/${JOB_NAME}_${BUILD_NUMBER}_key.pem"
    }

    options {
        timeout(time: 10, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        stage('Clone Repo') {
            steps {
                sh 'git clone -b ${BRANCH} ${GIT_REPO} ${LOCAL_APP_DIR}'
            }
        }
		
        stage('AWS Infra Setup') {
            steps {
                dir('infra') {
                    sh '''
                        set +x
                        terraform init
                        terraform apply -auto-approve -json > tf_apply.log 2>&1
                    '''
                    script {
                        env.REMOTE_HOST = sh(script: 'terraform output -raw public_ip', returnStdout: true).trim()
                        env.KEY_SECRET  = sh(script: 'terraform output -raw private_key_secret', returnStdout: true).trim()
                    }
                }
            }
        }
		
        stage('Configure SSH Credentials') {
            steps {
                sh '''
                    set +x
                    aws secretsmanager get-secret-value \
                        --region ${AWS_REGION} \
                        --secret-id ${KEY_SECRET} \
                        --query SecretString --output text > ${SSH_KEY_PATH}
                    chmod 400 ${SSH_KEY_PATH}
                '''
				timeout(time: 3, unit: 'MINUTES') {
                    waitUntil {
                        script {
                            return sh(script: "nc -z -w5 ${REMOTE_HOST} 22", returnStatus: true) == 0
                        }
                    }
                }
				sh '''
                    mkdir -p ~/.ssh
                    ssh-keyscan -H ${REMOTE_HOST} >> ~/.ssh/known_hosts 2>/dev/null
                '''
            }
        }
		
        stage('Confirm Docker Status on EC2') {
            steps {
                script{env.DOCKER_RUNNING = isDockerRunning()}
            }
        }
		
        stage('Install and Start Docker') {
            when {
                expression { env.DOCKER_RUNNING == "false" }
            }
            steps {
                sh '''
                    ssh -i ${SSH_KEY_PATH} ${EC2_REMOTE_USER}@${REMOTE_HOST} '
                        set -e
                        if ! command -v docker &> /dev/null; then
                            echo "Docker not installed — installing..."
                            sudo dnf install -y docker
                        fi
                        sudo systemctl enable --now docker
                        sudo usermod -aG docker ${EC2_REMOTE_USER}
                    '
                '''
                script{env.DOCKER_RUNNING = isDockerRunning()}
                sh '''
                    if ${DOCKER_RUNNING}; then
                        echo "Docker is UP and RUNNING...."
                    fi
                '''
            }
        }
        
        stage('Sync Project Files with EC2'){
            steps {
                sh '''
                    ssh -i ${SSH_KEY_PATH} ${EC2_REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_APP_DIR}"
                    rsync -av -e "ssh -i ${SSH_KEY_PATH}" --delete \
                        --exclude='.git/' \
                        --exclude='infra/' \
                        ${LOCAL_APP_DIR} ${EC2_REMOTE_USER}@${REMOTE_HOST}:${REMOTE_APP_DIR}
                '''
            }
        }
        
        stage('Deploy with Docker Compose'){
            steps {
                sh '''
                    ssh -i ${SSH_KEY_PATH} ${EC2_REMOTE_USER}@${REMOTE_HOST} "
                        cd ${REMOTE_APP_DIR} &&
                        docker compose down --remove-orphans || true &&
                        docker compose up -d --build
                        docker image prune -f
                    "
                '''
            }
        }
    }
    
    post {
        always {
            sh 'rm -f ${SSH_KEY_PATH} || true'
            cleanWs()
        }
    }
}

def isDockerRunning() {
    def exitCode = sh(
        script: "set +x; ssh -i ${env.SSH_KEY_PATH} ${env.EC2_REMOTE_USER}@${env.REMOTE_HOST} 'systemctl is-active --quiet docker'",
        returnStatus: true
    )
    if (exitCode == 0) {
        return true
    } else {
        return false
    }
}