#!/usr/bin/env bash

BASEDIR="$( cd "$( dirname "$${BASH_SOURCE[0]}" )" && pwd)"
source "${BASEDIR}/scripts/lib/common.sh"
source "${BASEDIR}/scripts/lib/deploy.sh"

action=$1
subaction=$2

validate_params "action" "subaction"

case $action in
  deploy)
    case $subaction in
      infra)
        deploy_infrastructure "$@"
      ;;
      app)
        deploy_application "$@"
      ;;
      *)
        echo "$2 is not a valid subaction of the 'deploy' action"
        exit 1
    esac
  ;;
  *)
    echo "$1 is not a valid action"
    exit 1
  ;;
esac