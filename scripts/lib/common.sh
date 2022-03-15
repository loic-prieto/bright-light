# Given a list of parameter names, validates
# that they exist.
# If they don't the bash script ends with an error message
function validate_params() {
  for param_name in "$@"; do
    if [[ -z "${!param_name}" ]]; then
      echo "Parameter ${param_name} is mandatory"
      exit 1
    fi
  done
}

# Given a list of commands, validate they exist in the system or exits with
# an error message
function validate_commands() {
  for command_name in "$@"; do
    if [[ $(which $command_name) == "" ]]; then
      echo "The command $command_name must exist in the system for this script to work"
      exit 1
    fi
  done
}