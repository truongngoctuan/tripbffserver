AWS_PROFILE=tripbff
STAGE=inte
aws s3 sync ./data/activity  s3://tripbff-$STAGE/activity --profile $AWS_PROFILE
aws s3 sync ./data/emoji  s3://tripbff-$STAGE/emoji --profile $AWS_PROFILE