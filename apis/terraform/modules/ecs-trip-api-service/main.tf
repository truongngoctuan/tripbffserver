resource "aws_ecs_task_definition" "tripbff-trip-api" {
  family                = "tripbff-trip-api"
  container_definitions = <<DEFINITION
  [
    {
      "name": "tripbff-trip-api-container",
      "image": "${var.repository_url}:latest",
      "memoryReservation": 96,
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
          "name": "AWS_ACCESS_KEY_ID",
          "value": "${var.aws_id}"
        },
        {
          "name": "AWS_SECRET_ACCESS_KEY",
          "value": "${var.aws_key}"
        },
        {
          "name": "S3_BUCKET",
          "value": "${var.s3_bucket}"
        },
        {
          "name": "S3_REGION",
          "value": "ap-southeast-1"
        },
        {
          "name": "INTERNAL_SERVER_PORT",
          "value": "80"
        },
        {
          "name": "MONGODB_CONNECTION_STRING",
          "value": "${var.mongodb}"
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
          "name": "SERVER_HOST",
          "value": "${var.api_trip_api_gateway}"
        },
        {
          "name": "SERVER_PORT",
          "value": "${var.api_trip_api_gateway_port}"
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
  name              = "tripbff-trip-api"
  retention_in_days = 14
}

resource "aws_ecs_service" "tripbff-trip-api-service" {
  name            = "tripbff-trip-api-service"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.tripbff-trip-api.arn

  desired_count = 1

  deployment_maximum_percent         = 100
  deployment_minimum_healthy_percent = 0
}
