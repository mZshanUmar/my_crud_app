terraform {
  backend "s3" {
    region         = "us-east-1"
    bucket         = "zshan-tf-backend"
    key            = "jenkins-ec2/terraform.tfstate"
    use_lockfile   = true
    encrypt        = true
  }
}