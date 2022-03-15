function deploy_infrastructure() {
  validate_commands "aws"

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
      --hetzner-api-token)
        local home_ip=$2
        shift;shift;
      ;;
      *)
        echo "$1 is not a valid parameter"
        exit 1
      ;;
  esac
  done
  validate_params "aws_profile" "hetzner_api_token"

  echo "I'm deploying infrastructure"
  provision_server
}

function provision_server() {
  echo "I'm provisioning the server"
}

function deploy_application() {
  echo "I'm deploying the application"
}