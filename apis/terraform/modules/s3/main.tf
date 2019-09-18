resource "aws_s3_bucket" "b" {
  bucket = "${var.name}-${var.stage}"
  acl    = "private"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}