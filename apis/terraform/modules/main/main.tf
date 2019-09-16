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
  source     = "../ecs-traefik-whoami-service"
  cluster_id = aws_ecs_cluster.cluster.id
  domain     = var.domain
}

module "ecs-sso-services" {
  source         = "../ecs-sso-service"
  cluster_id     = aws_ecs_cluster.cluster.id
  repository_url = var.sso_repository_url
  domain         = var.domain
  mongodb        = var.mongodb
}

module "ecs-redis-services" {
  source     = "../ecs-redis-service"
  cluster_id = aws_ecs_cluster.cluster.id
  domain     = var.domain
}

module "ecs-trip_api-services" {
  source                    = "../ecs-trip-api-service"
  cluster_id                = aws_ecs_cluster.cluster.id
  repository_url            = var.trip_api_repository_url
  mongodb                   = var.mongodb
  domain                    = var.domain
  api_redis_gateway         = module.instances.eip_private_ip # module.instances.eip_public_ip
  api_redis_gateway_port    = 6379                            # 6379
  api_trip_api_gateway      = "trip-api.${var.domain}"        # module.instances.eip_public_ip
  api_trip_api_gateway_port = 80                              # 8000
}

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

data "aws_route53_zone" "selected" {
  name = "${var.domain}."
}

resource "aws_route53_record" "traefik-dashboard" {
  zone_id = "${data.aws_route53_zone.selected.zone_id}"
  name    = "${data.aws_route53_zone.selected.name}"
  type    = "A"
  ttl     = "30"
  records = [module.instances.eip_public_ip]
}

resource "aws_route53_record" "whoami" {
  zone_id = "${data.aws_route53_zone.selected.zone_id}"
  name    = "whoami.${data.aws_route53_zone.selected.name}"
  type    = "A"
  ttl     = "30"
  records = [module.instances.eip_public_ip]
}

resource "aws_route53_record" "sso" {
  zone_id = "${data.aws_route53_zone.selected.zone_id}"
  name    = "sso.${data.aws_route53_zone.selected.name}"
  type    = "A"
  ttl     = "30"
  records = [module.instances.eip_public_ip]
}

resource "aws_route53_record" "trip-api" {
  zone_id = "${data.aws_route53_zone.selected.zone_id}"
  name    = "trip-api.${data.aws_route53_zone.selected.name}"
  type    = "A"
  ttl     = "30"
  records = [module.instances.eip_public_ip]
}
