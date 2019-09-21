    

resource "aws_ecs_task_definition" "tripbff-infographic" {
  family                = "tripbff-infographic"
  container_definitions = <<DEFINITION
  [
    {
      "name": "tripbff-infographic-container",
      "image": "${var.repository_url}:latest",
      "memoryReservation": 160,
      "essential": true,
      "portMappings": [],
      "environment": [
        {
          "name": "LOTTIE_WEB_HOST",
          "value": "${var.api_lottie_web_gateway}"
        },
        {
          "name": "LOTTIE_WEB_PORT",
          "value": "${var.api_lottie_web_gateway_port}"
        },
        {
          "name": "REDIS_HOST",
          "value": "${var.api_redis_gateway}"
        },
        {
          "name": "REDIS_PORT",
          "value": "${var.api_redis_gateway_port}"
        },
        {
          "name": "TRIP_API_HOST",
          "value": "${var.api_trip_api_gateway}"
        },
        {
          "name": "TRIP_API_PORT",
          "value": "${var.api_trip_api_gateway_port}"
        }
      ],
      "dockerLabels": {
        "traefik.enable": "true",
        "traefik.frontend.rule": "Host: ${var.sub_domain}.${var.domain}",
        "traefik.backend.rule": "Host: ${var.sub_domain}.${var.domain}"
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "secretOptions": null,
        "options": {
          "awslogs-group": "${aws_cloudwatch_log_group.log1.name}",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    },
    {
      "name": "tripbff-lottie-web-container",
      "image": "${var.lottie_web_repository_url}:latest",
      "memoryReservation": 32,
      "essential": true,
      "portMappings": [
        {
          "hostPort": 0,
          "protocol": "tcp",
          "containerPort": 80
        }
      ],
      "environment": [
      ],
      "dockerLabels": {
        "traefik.enable": "true",
        "traefik.frontend.rule": "Host: ${var.lottie_sub_domain}.${var.domain}",
        "traefik.backend.rule": "Host: ${var.lottie_sub_domain}.${var.domain}"
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "secretOptions": null,
        "options": {
          "awslogs-group": "${aws_cloudwatch_log_group.log1.name}",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
  DEFINITION
}

resource "aws_cloudwatch_log_group" "log1" {
  name              = "tripbff-infographic"
  retention_in_days = 14
}

resource "aws_ecs_service" "tripbff-infographic-service" {
  name            = "tripbff-infographic-service"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.tripbff-infographic.arn

  desired_count = 1

  deployment_maximum_percent         = 100
  deployment_minimum_healthy_percent = 0
}
