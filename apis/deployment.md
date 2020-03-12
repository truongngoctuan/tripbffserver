
`build` files
`push-latest` file
`push-latest-with-tag` file
`deploy` files <-- only use these file to force re-deploy services faster, no need on PROD since it will be updated version on terraform

# Instruction
* Install authen for docker https://github.com/awslabs/amazon-ecr-credential-helper
* Make sure you setup a AWS_PROFILE the same name as `tripbff-test` for `TESTING` or `tripbff` for PREINTE and PROD