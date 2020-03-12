resource "aws_ecs_task_definition" "tripbff-redis" {
  family = "tripbff-redis"
  volume {
    name = "redis-${var.stage}-volumn"
    docker_volume_configuration {
      scope         = "task"
      driver        = "local"
    }
  }
  container_definitions = <<DEFINITION
  [
    {
      "name": "tripbff-redis-container",
      "image": "${var.repository_url}",
      "memoryReservation": 32,
      "essential": true,
      "portMappings": [
        {
          "hostPort": 6379,
          "protocol": "tcp",
          "containerPort": 6379
        }
      ],
      "mountPoints": [
        {
          "sourceVolume": "redis-${var.stage}-volumn",
          "containerPath": "/var/redis"
        }
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

resource "aws_ecs_service" "tripbff-redis-service" {
  name            = "tripbff-redis-service"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.tripbff-redis.arn

  desired_count = 1

  deployment_maximum_percent         = 100
  deployment_minimum_healthy_percent = 0
}
