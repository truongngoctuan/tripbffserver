resource "aws_ecs_task_definition" "tripbff-sso" {
  family                = "tripbff-sso"
  memory                = 128
  container_definitions = <<DEFINITION
  [
    {
      "name": "tripbff-sso-container",
      "image": "866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:latest",
      "cpu": 0,
      "essential": true,
      "portMappings": [
        {
          "hostPort": 3000,
          "protocol": "tcp",
          "containerPort": 80
        }
      ],
      "environment": [
        {
          "name": "MONGODB_CONNECTION_STRING",
          "value": "mongodb+srv://MongoDbUser:nEohpAvoyimKiZAH@clusterdevelopment-ckix9.mongodb.net/UnicornBFF?retryWrites=true&w=majority"
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
      "logConfiguration": {
        "logDriver": "awslogs",
        "secretOptions": null,
        "options": {
          "awslogs-group": "/ecs/tripbff-sso",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    },
    {
      "name": "tripbff-redis-container",
      "image": "redis:4-alpine",
      "cpu": 0,
      "essential": true,
      "portMappings": [
        {
          "hostPort": 6379,
          "protocol": "tcp",
          "containerPort": 6379
        }
      ],
      "environment": [
        {
          "name": "MONGODB_CONNECTION_STRING",
          "value": "mongodb+srv://MongoDbUser:nEohpAvoyimKiZAH@clusterdevelopment-ckix9.mongodb.net/UnicornBFF?retryWrites=true&w=majority"
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
      "logConfiguration": {
        "logDriver": "awslogs",
        "secretOptions": null,
        "options": {
          "awslogs-group": "${aws_cloudwatch_log_group.sso.name}",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
  DEFINITION
}

resource "aws_cloudwatch_log_group" "sso" {
  name              = "tripbff-sso"
  retention_in_days = 14
}

resource "aws_ecs_service" "tripbff-sso-service" {
  name            = "tripbff-sso-service"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.tripbff-sso.arn

  desired_count = 1

  deployment_maximum_percent         = 100
  deployment_minimum_healthy_percent = 0
}
