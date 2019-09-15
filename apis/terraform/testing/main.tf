# module "repos" {
#   source = "../modules/ecr"
# }

module "this" {
  source = "../modules/main"

  sso_repository_url = var.sso_repository_url # module.repos.sso_repository_url
  trip_api_repository_url = var.trip_api_repository_url
  mongodb = "mongodb+srv://dev-mongodb-access:u7NFj4hB2YkNjyF@cluster0-uvltq.mongodb.net/test?retryWrites=true&w=majority"
}