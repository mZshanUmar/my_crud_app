terraform {
  backend "s3" {
    bucket         = "zshan-tf-backend"
    key            = "jenkins-ec2/terraform.tfstate"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}