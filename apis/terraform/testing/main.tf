locals {
  domain = "tntuan.tk"
  name   = "tripbff"
  stage  = "testing"

  sso_repository_version         = "latest"
  trip_api_repository_version    = "latest"
  infographic_repository_version = "latest"

  # sso_repository_version         = "1.1.0"
  # trip_api_repository_version    = "1.1.0"
  # infographic_repository_version = "1.1.0"
}

# module "repos" {
#   source = "../modules/ecr"
# }

# https://medium.com/@kcabading/getting-a-free-domain-for-your-ec2-instance-3ac2955b0a2f
# how to link tk domain to aws

module "this" {
  source = "../modules/main"

  stage                          = local.stage
  sso_repository_url             = var.sso_repository_url
  sso_repository_version         = local.sso_repository_version
  redis_repository_url           = var.redis_repository_url
  trip_api_repository_url        = var.trip_api_repository_url
  trip_api_repository_version    = local.trip_api_repository_version
  infographic_repository_url     = var.infographic_repository_url
  infographic_repository_version = local.infographic_repository_version
  mongodb                        = "mongodb+srv://dev-mongodb-access:u7NFj4hB2YkNjyF@cluster0-uvltq.mongodb.net/test?retryWrites=true&w=majority"
  domain                         = local.domain
  aws_id                         = var.aws_id
  aws_key                        = var.aws_key
  key_name                       = "tripbff-ec2-key-pair"
  s3_bucket                      = "${local.name}-${local.stage}"
}
