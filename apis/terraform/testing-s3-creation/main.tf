locals {
  name   = "tripbff"
  stage  = "testing"
}

#----- S3--------
module "s3-bucket" {
  source = "../modules/s3"

  name             = local.name
  stage            = local.stage
  aws_account_code = "arn:aws:iam::883134154478:user/dev-access"
}