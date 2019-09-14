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
  mongodb        = var.sso_mongodb
}

module "ec2-profile" {
  source = "../ecs-instance-profile"
  name   = local.namespace
}

module "instances" {
  source    = "../ec2_instances_manual"
  stage     = local.stage
  namespace = local.namespace
}