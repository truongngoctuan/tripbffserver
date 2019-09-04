resource "aws_ecs_task_definition" "tripbff-sso" {
  family                = "tripbff-sso"
  container_definitions = "${file("task-definitions/sso.json")}"
}

resource "aws_ecs_service" "tripbff-sso-service" {
  name            = "tripbff-sso-service"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.tripbff-sso.arn

  desired_count = 1

  deployment_maximum_percent         = 100
  deployment_minimum_healthy_percent = 0
}
