# ecs.tf
resource "aws_ecs_cluster" "cluster" {
  name = var.cluster_name
}

resource "aws_ecs_task_definition" "task" {
  family                   = var.task_definition_family
  network_mode             = "bridge"
  requires_compatibilities = ["EXTERNAL"]
  cpu                      = "1024"
  memory                   = "2048"
  container_definitions    = jsonencode([
    {
      name      = "training-ui-container-1",
      image     = var.container_image,
      cpu       = 512,
      memory    = 1048,
      essential = true,
      portMappings = [
        {
          containerPort = var.container_port,
          hostPort      = var.host_ports_1
        }
      ]
    },
    {
      name      = "training-ui-container-2",
      image     = var.container_image,
      cpu       = 512,
      memory    = 1048,
      essential = true,
      portMappings = [
        {
          containerPort = var.container_port,
          hostPort      = var.host_ports_2
        }
      ]
    }
  ])
}
