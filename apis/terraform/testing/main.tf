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
  stage = "pre-inte"

  sso_repository_url         = var.sso_repository_url # module.repos.sso_repository_url
  redis_repository_url    = var.redis_repository_url
  trip_api_repository_url    = var.trip_api_repository_url
  infographic_repository_url = var.infographic_repository_url
  lottie_web_repository_url  = var.lottie_web_repository_url
  mongodb                    = "mongodb+srv://dev-mongodb-access:u7NFj4hB2YkNjyF@cluster0-uvltq.mongodb.net/test?retryWrites=true&w=majority"
  domain                     = local.domain
}
