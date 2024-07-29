# providers.tf
provider "aws" {
  profile = "dev"
  region  = "me-central-1"
}


# Variable
variable "cluster_name" { type = string }
variable "service_name" { type = string }
variable "task_definition_family" { type = string }
variable "desired_count" { type = number }
variable "container_image" { type = string }
variable "container_port" { type = number }
variable "host_ports_1" { type = number}
variable "host_ports_2" { type = number}

# outputs.tf
output "cluster_id" { value = aws_ecs_cluster.cluster.id }
output "task_definition_arn" { value = aws_ecs_task_definition.task.arn }
output "service_name" { value = aws_ecs_service.service.name }
