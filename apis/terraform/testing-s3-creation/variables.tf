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