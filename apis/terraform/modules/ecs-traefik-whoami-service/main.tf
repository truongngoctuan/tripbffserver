resource "aws_ecs_task_definition" "tripbff-whoami" {
  family                = "tripbff-whoami"
  container_definitions = <<DEFINITION
  [
    {
      "name": "tripbff-whoami-container",
      "image": "containous/whoami",
      "memoryReservation": 16,
      "essential": true,
      "portMappings": [
        {
          "hostPort": 0,
          "protocol": "tcp",
          "containerPort": 80
        }
      ],
      "environment": [],
      "dockerLabels": {
        "traefik.enable": "true",
        "traefik.frontend.rule": "Host: whoami.${var.domain}",
        "traefik.backend.rule": "Host: whoami.${var.domain}"
      },
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
#   name              = "tripbff-whoami"
#   retention_in_days = 14
# }

resource "aws_ecs_service" "tripbff-whoami-service" {
  name            = "tripbff-whoami-service"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.tripbff-whoami.arn

  desired_count = 2

  deployment_maximum_percent         = 100
  deployment_minimum_healthy_percent = 0
}
