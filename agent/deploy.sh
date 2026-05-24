#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy.sh  —  redeploy the Chris lead-capture agent to Vertex AI Agent Engine
#
# Usage:
#   ./agent/deploy.sh              # update the existing engine (default)
#   ./agent/deploy.sh --new        # create a brand-new engine (rare)
#
# Requirements:
#   • Python .venv is active   (source agent/.venv/bin/activate)
#   • gcloud is authenticated  (gcloud auth application-default login)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

PROJECT="pressurewashing-xperts"
REGION="us-west1"
ENGINE_ID="3947273131994906624"          # existing Reasoning Engine resource ID
DISPLAY_NAME="Pressure Washing Xperts — Lead Agent"
DESCRIPTION="Lead capture assistant for Pressure Washing Xperts. Greets visitors, presents current offers, answers service questions, and collects quote request information (name, phone, email, city, ZIP, square footage, project details) for Metro Atlanta residential and commercial customers."

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ── Resolve Python environment ─────────────────────────────────────────────
if [[ -z "${VIRTUAL_ENV:-}" ]]; then
  if [[ -d "$SCRIPT_DIR/.venv" ]]; then
    # shellcheck source=/dev/null
    source "$SCRIPT_DIR/../.venv/bin/activate"
    echo "✓ Activated .venv"
  else
    echo "⚠  No virtual environment active. Run: source .venv/bin/activate"
    exit 1
  fi
fi

# ── Verify gcloud auth ─────────────────────────────────────────────────────
if ! gcloud auth application-default print-access-token &>/dev/null; then
  echo "⚠  Not authenticated. Run: gcloud auth application-default login"
  exit 1
fi

# ── Deploy ─────────────────────────────────────────────────────────────────
if [[ "${1:-}" == "--new" ]]; then
  echo "🚀 Creating NEW Vertex AI Agent Engine..."
  adk deploy agent_engine \
    --project="$PROJECT" \
    --region="$REGION" \
    --display_name="$DISPLAY_NAME" \
    --description="$DESCRIPTION" \
    "$SCRIPT_DIR"
  echo ""
  echo "✅ New engine created. Update GOOGLE_AGENT_RESOURCE_ID in .env.local"
  echo "   and in Vercel environment variables with the new resource ID."
else
  echo "🔄 Updating existing Vertex AI Agent Engine ($ENGINE_ID)..."
  AGENT_PKG="$SCRIPT_DIR/pressure_washing_xperts___lead_agent"
  if adk deploy agent_engine \
    --project="$PROJECT" \
    --region="$REGION" \
    --agent_engine_id="$ENGINE_ID" \
    --display_name="$DISPLAY_NAME" \
    --description="$DESCRIPTION" \
    --no-trace_to_cloud \
    "$AGENT_PKG"; then
    echo ""
    echo "✅ Deploy complete."
  else
    echo ""
    echo "❌ Deploy failed. Retry ./agent/deploy.sh or check Cloud logs."
    exit 1
  fi
fi
