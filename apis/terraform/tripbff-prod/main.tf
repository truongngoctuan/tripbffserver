locals {
  domain                         = "tripbff.com"
  sso_repository_version         = "1.1.0"
  trip_api_repository_version    = "1.1.0"
  infographic_repository_version = "1.1.0"
}

module "this" {
  source = "../modules/main"

  stage                          = "prod"
  sso_repository_url             = var.sso_repository_url
  sso_repository_version         = local.sso_repository_version
  redis_repository_url           = var.redis_repository_url
  trip_api_repository_url        = var.trip_api_repository_url
  trip_api_repository_version    = local.trip_api_repository_version
  infographic_repository_url     = var.infographic_repository_url
  infographic_repository_version = local.infographic_repository_version
  mongodb                        = "mongodb+srv://MongoDbUser:bOiF9RMl3TsFGOCh@clusterdevelopment-ckix9.mongodb.net/UnicornBFF?retryWrites=true&w=majority"
  domain                         = local.domain
  aws_id                         = var.aws_id
  aws_key                        = var.aws_key
  key_name                       = "tripbff-inte-kp"
  s3_bucket                      = "tripbff-inte"
}
