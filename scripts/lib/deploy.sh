function deploy_infrastructure() {
  echo "Deploying the infrastructure via Terraform..."
  # Parse extra parameters
  while [[ $# -gt 0 ]]
  do
    local key="$1"
    case $key in
        --aws_profile)
          local aws_profile=$2
          shift;shift;
        ;;
        --hetzner-api-token)
          local hetzner_api_token=$2
          shift;shift;
        ;;
        --home-ip)
          local home_ip=$2
          shift;shift;
        ;;
        --ssh-key-name)
          local ssh_key_name=$2
          shift;shift;
        ;;
    esac
  done
  validate_params "aws_profile" "hetzner_api_token" "ssh_key_name"
  if [[ -n "${home_ip}" ]];then
    local home_ip=$(curl ifconfig.me)
  fi
  echo "I'm deploying infrastructure"
  cd "$BASEDIR/infrastructure/terraform"
  terraform init
  terraform apply -var="hetzner_api_token=${hetzner_api_token}" \
    -var="home_ip=${home_ip}" \
    -var="aws_profile=${aws_profile}"

  if [[ $? -ne 0 ]]; then
    echo "There was something wrong while deploying Terraform, the script cannot continue"
    exit 1
  else
    echo "Infrastructure created, now provisioning the server"
  fi

  provision_server "${ssh_key_name}"
  if [[ $? -ne 0 ]]; then
    echo "There was an error while provisioning the server, the script cannot continue"
    exit 1
  fi
  echo "Server provisioned"
}

function provision_server() {
  local ssh_key="~/.ssh/$1"

  cd "${BASEDIR}/infrastructure/ansible"
  ansible-playbook -i inventory.ini --private-key "${ssh_key}" bright-light-server.yaml
}

function deploy_application() {
  echo "I'm deploying the application"
}