resource "aws_ecs_task_definition" "tripbff-traefik" {
  family                = "tripbff-traefik"
  container_definitions = <<DEFINITION
  [
    {
      "name": "tripbff-traefik-container",
      "image": "traefik:1.7-alpine",
      "memoryReservation": 32,
      "essential": true,
      "portMappings": [
        {
          "hostPort": 80,
          "protocol": "tcp",
          "containerPort": 80
        },
        {
          "hostPort": 8080,
          "protocol": "tcp",
          "containerPort": 8080
        }
      ],
      "command": [
        "--loglevel=${var.log_level}",
        "--traefikLog.format=${var.log_format}",
        "--api",
        "--api.dashboard=true",
        "--api.entryPoint=traefik",
        "--ping",
        "--ping.entrypoint=http",
        "--ecs",
        "--ecs.clusters=${var.ecs_cluster_name}",
        "--ecs.exposedbydefault=false",
        "--ecs.region=${var.ecs_cluster_region}",
        "--defaultentrypoints=http",
        "--entryPoints=Name:http Address::80",
        "--entryPoints=Name:traefik Address::8080"
      ],
      "environment": [],
      "logConfiguration": {
        "logDriver": "awslogs",
        "secretOptions": null,
        "options": {
          "awslogs-group": "tripbff-${var.stage}",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
  DEFINITION
}

# resource "aws_cloudwatch_log_group" "log1" {
#   name              = "tripbff-traefik"
#   retention_in_days = 14
# }

resource "aws_ecs_service" "tripbff-traefik-service" {
  name            = "tripbff-traefik-service"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.tripbff-traefik.arn

  desired_count = 1

  deployment_maximum_percent         = 100
  deployment_minimum_healthy_percent = 0
}
