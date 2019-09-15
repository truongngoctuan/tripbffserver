locals {
  region    = "ap-southeast-1"
  namespace = "tripbff"
  stage     = "dev"

  # This is the convention we use to know what belongs to each other
  resources_name = "${local.namespace}-${local.stage}"
}

#----- ECS  Services--------

# We have one ECS cluster that instances will register with
resource "aws_ecs_cluster" "cluster" {
  name = local.namespace
}

#----- ECS  Services: API gateway + load balancing--------


module "ecs-traefik-services" {
  source             = "../ecs-traefik-service"
  cluster_id         = aws_ecs_cluster.cluster.id
  ecs_cluster_name   = aws_ecs_cluster.cluster.name
  ecs_cluster_region = local.region
  domain             = var.domain
  # http://ec2-18-136-37-156.ap-southeast-1.compute.amazonaws.com
  # domain = "ec2-${replace(module.instances.eip_public_ip, ".", "-")}.ap-southeast-1.compute.amazonaws.com"
}


module "ecs-traefik-whoami-services" {
  source             = "../ecs-traefik-whoami-service"
  cluster_id         = aws_ecs_cluster.cluster.id
  domain             = var.domain
}

# module "ecs-sso-services" {
#   source         = "../ecs-sso-service"
#   cluster_id     = aws_ecs_cluster.cluster.id
#   repository_url = var.sso_repository_url
#   mongodb        = var.mongodb
# }

# module "ecs-trip_api-services" {
#   source                    = "../ecs-trip-api-service"
#   cluster_id                = aws_ecs_cluster.cluster.id
#   repository_url            = var.trip_api_repository_url
#   mongodb                   = var.mongodb
#   api_redis_gateway         = module.instances.eip_public_ip
#   api_redis_gateway_port    = 6379
#   api_trip_api_gateway      = module.instances.eip_public_ip
#   api_trip_api_gateway_port = 8000
# }

# module "ecs-infographic-services" {
#   source                    = "../ecs-infographic-service"
#   cluster_id                = aws_ecs_cluster.cluster.id
#   repository_url            = var.infographic_repository_url
#   lottie_web_repository_url = var.lottie_web_repository_url

#   mongodb                     = var.mongodb
#   api_redis_gateway           = module.instances.eip_public_ip
#   api_redis_gateway_port      = 6379
#   api_trip_api_gateway        = module.instances.eip_public_ip
#   api_trip_api_gateway_port   = 8000
#   api_lottie_web_gateway      = module.instances.eip_public_ip
#   api_lottie_web_gateway_port = 4050
# }

module "instances" {
  source    = "../ec2_instances_manual"
  stage     = local.stage
  namespace = local.namespace
}
