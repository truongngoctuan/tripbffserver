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

module "ecs-sso-services" {
  source         = "../ecs-sso-services"
  cluster_id     = aws_ecs_cluster.cluster.id
  repository_url = var.sso_repository_url
  mongodb        = var.mongodb
}

module "ecs-trip_api-services" {
  source         = "../ecs-trip-api-services"
  cluster_id     = aws_ecs_cluster.cluster.id
  repository_url = var.trip_api_repository_url
  mongodb        = var.mongodb
  api_redis_gateway = module.instances.eip_public_ip
  api_redis_gateway_port = 6379
  api_trip_api_gateway = module.instances.eip_public_ip
  api_trip_api_gateway_port = 8000
}

module "instances" {
  source    = "../ec2_instances_manual"
  stage     = local.stage
  namespace = local.namespace
}