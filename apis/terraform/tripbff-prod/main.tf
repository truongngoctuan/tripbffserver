locals {
  domain = "tripbff.com"
}

module "this" {
  source = "../modules/main"

  stage                      = "prod"
  sso_repository_url         = var.sso_repository_url
  redis_repository_url       = var.redis_repository_url
  trip_api_repository_url    = var.trip_api_repository_url
  infographic_repository_url = var.infographic_repository_url
  mongodb                    = "mongodb+srv://MongoDbUser:nEohpAvoyimKiZAH@clusterdevelopment-ckix9.mongodb.net/UnicornBFF?retryWrites=true&w=majority"
  domain                     = local.domain
  aws_id                     = var.aws_id
  aws_key                    = var.aws_key
  key_name                   = "tripbff-inte-kp"
  s3_bucket                  = "tripbff-inte"
}
