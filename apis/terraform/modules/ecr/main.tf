resource "aws_ecr_repository" "sso" {
  name = "tripbff/sso"
}

resource "aws_ecr_repository" "trip-api" {
  name = "tripbff/trip-api"
}

resource "aws_ecr_repository" "lottie-web" {
  name = "tripbff/lottie-web"
}

resource "aws_ecr_repository" "infographic" {
  name = "tripbff/infographic"
}