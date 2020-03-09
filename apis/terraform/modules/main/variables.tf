variable "stage" {
  description = "domain for traefik"
  type        = string
}

variable "domain" {
  description = "domain for traefik"
  type        = string
}

variable "region" {
  description = "The AWS region things are created in"
  default     = "ap-southeast-1"
}

variable "aws_id" {
  type        = string
  description = "AWS_ACCESS_KEY_ID"
}

variable "aws_key" {
  type        = string
  description = "AWS_SECRET_ACCESS_KEY"
}

variable "ecs_task_execution_role_name" {
  description = "ECS task execution role name"
  default     = "myEcsTaskExecutionRole"
}

variable "az_count" {
  description = "Number of AZs to cover in a given region"
  default     = "1"
}

variable "sso_repository_url" {
  description = "sso repository"
  type        = string
}

variable "sso_repository_version" {
  type    = string
  default = "latest"
}

variable "redis_repository_url" {
  description = "redis repository"
  type        = string
}

variable "trip_api_repository_url" {
  description = "trip-api repository"
  type        = string
}
variable "infographic_repository_url" {
  description = "infographic repository"
  type        = string
}

variable "mongodb" {
  description = "sso mongodb connection string"
  type        = string
}

variable "key_name" {
  description = "ec2 key pair"
  type        = string
}

variable "s3_bucket" {
  type = string
}
