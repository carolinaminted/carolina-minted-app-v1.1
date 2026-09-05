#!/bin/sh

protected_branch="main"
allowed_branch_message="feature/<name>, fix/<name>, hotfix/<name>, docs/<name>, idea/<name>, spike/<name>, chore/<name>, or release/<name>"

branch_policy_fail() {
  printf '%s\n' "Branch policy: $1" >&2
  exit 1
}

branch_policy_is_allowed_work_branch() {
  case "$1" in
    feature/* | fix/* | hotfix/* | docs/* | idea/* | spike/* | chore/* | release/*)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

branch_policy_require_work_branch() {
  operation="$1"
  current_branch=$(git symbolic-ref --quiet --short HEAD 2>/dev/null || true)

  if [ -z "$current_branch" ]; then
    branch_policy_fail "cannot perform '$operation' from a detached HEAD; create a short-lived branch first ($allowed_branch_message)."
  fi

  if [ "$current_branch" = "$protected_branch" ] || [ "$current_branch" = develop ]; then
    branch_policy_fail "operation '$operation' on '$protected_branch' is prohibited; create a short-lived branch first ($allowed_branch_message)."
  fi

  if ! branch_policy_is_allowed_work_branch "$current_branch"; then
    branch_policy_fail "branch '$current_branch' is not allowed; use $allowed_branch_message."
  fi
}

branch_policy_check_push_updates() {
  carriage_return=$(printf '\r')

  while read -r local_ref local_oid remote_ref remote_oid; do
    local_ref=${local_ref%"$carriage_return"}
    local_oid=${local_oid%"$carriage_return"}
    remote_ref=${remote_ref%"$carriage_return"}
    remote_oid=${remote_oid%"$carriage_return"}

    if [ -z "$local_ref" ]; then
      continue
    fi

    if [ "$remote_ref" = "refs/heads/$protected_branch" ] || [ "$remote_ref" = refs/heads/develop ]; then
      branch_policy_fail "pushing directly to '$protected_branch' is prohibited; use a reviewed short-lived branch."
    fi

    case "$local_ref" in
      "(delete)" | refs/tags/*)
        continue
        ;;
      refs/heads/feature/* | refs/heads/fix/* | refs/heads/hotfix/* | refs/heads/docs/* | refs/heads/idea/* | refs/heads/spike/* | refs/heads/chore/* | refs/heads/release/*)
        ;;
      refs/heads/*)
        pushed_branch=${local_ref#refs/heads/}
        branch_policy_fail "branch '$pushed_branch' is not allowed; use $allowed_branch_message."
        ;;
      *)
        branch_policy_fail "unsupported push source '$local_ref'."
        ;;
    esac

    case "$remote_ref" in
      refs/heads/feature/* | refs/heads/fix/* | refs/heads/hotfix/* | refs/heads/docs/* | refs/heads/idea/* | refs/heads/spike/* | refs/heads/chore/* | refs/heads/release/* | refs/tags/*)
        ;;
      refs/heads/*)
        pushed_branch=${remote_ref#refs/heads/}
        branch_policy_fail "remote branch '$pushed_branch' is not allowed; use $allowed_branch_message."
        ;;
      *)
        branch_policy_fail "unsupported push destination '$remote_ref'."
        ;;
    esac
  done
}
