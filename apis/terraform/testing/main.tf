locals {
  domain = "tntuan.tk"
}

# module "repos" {
#   source = "../modules/ecr"
# }

# https://medium.com/@kcabading/getting-a-free-domain-for-your-ec2-instance-3ac2955b0a2f
# how to link tk domain to aws

module "this" {
  source = "../modules/main"

  stage                      = "preinte"
  sso_repository_url         = var.sso_repository_url # module.repos.sso_repository_url
  redis_repository_url       = var.redis_repository_url
  trip_api_repository_url    = var.trip_api_repository_url
  infographic_repository_url = var.infographic_repository_url
  mongodb                    = "mongodb+srv://dev-mongodb-access:u7NFj4hB2YkNjyF@cluster0-uvltq.mongodb.net/test?retryWrites=true&w=majority"
  domain                     = local.domain
  aws_id                     = var.aws_id
  aws_key                    = var.aws_key
  aws_account_code = "arn:aws:iam::883134154478:user/dev-access"
}
