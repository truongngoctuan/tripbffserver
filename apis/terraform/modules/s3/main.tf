resource "aws_s3_bucket" "bucket1" {
  bucket = "${var.name}-${var.stage}"
  acl    = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST"]
    allowed_origins = ["*"]
  }

  tags = {
    Name        = var.name
    Environment = var.stage
  }
}

resource "aws_s3_bucket_public_access_block" "permissions" {
  bucket = "${aws_s3_bucket.bucket1.id}"

  ignore_public_acls = true
}

resource "aws_s3_bucket_policy" "b" {
  bucket = "${aws_s3_bucket.bucket1.id}"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "MYBUCKETPOLICY",
  "Statement": [
    {
      "Sid": "IPAllow",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::${var.name}-${var.stage}/*"
    }
  ]
}
POLICY
}