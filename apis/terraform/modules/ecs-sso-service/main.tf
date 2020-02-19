resource "aws_ecs_task_definition" "tripbff-sso" {
  family                = "tripbff-sso"
  container_definitions = <<DEFINITION
  [
    {
      "name": "tripbff-sso-container",
      "image": "${var.repository_url}:${var.repository_version}",
      "memoryReservation": 64,
      "essential": true,
      "portMappings": [
        {
          "hostPort": 0,
          "protocol": "tcp",
          "containerPort": 80
        }
      ],
      "environment": [
        {
          "name": "MONGODB_CONNECTION_STRING",
          "value": "${var.mongodb}"
        },
        {
          "name": "SERVER_HOST",
          "value": "localhost"
        },
        {
          "name": "SERVER_PORT",
          "value": "80"
        }
      ],
      "dockerLabels": {
        "traefik.enable": "true",
        "traefik.frontend.rule": "Host: ${var.sub_domain}-${var.stage}.${var.domain}",
        "traefik.backend.rule": "Host: ${var.sub_domain}-${var.stage}.${var.domain}"
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

resource "aws_ecs_service" "tripbff-sso-service" {
  name            = "tripbff-sso-service"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.tripbff-sso.arn

  desired_count = 1

  deployment_maximum_percent         = 100
  deployment_minimum_healthy_percent = 0
}
