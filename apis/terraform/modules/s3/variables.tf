variable "name" {
  description = "name"
  type        = string
}

variable "stage" {
  description = "env"
  type        = string
}

variable "aws_account_code" {
  description = "account code used to grant permission, For example: arn:aws:iam::xxx:user/yyy"
  type        = string
}
