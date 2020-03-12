## How to setup in local machine
* create aws profile `tripbff-test`
* build apps and push to ecr using `build-*.sh` command-line file
* create file `variables.tf` with authentication data

```
aws_id = "id here"
aws_key = "key here"
```