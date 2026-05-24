"""
Tools available to the Chris agent.
"""
import os
import uuid
from datetime import datetime, timezone

from google.cloud import bigquery


def submit_lead(
    full_name: str,
    phone: str,
    email: str,
    city: str,
    zip_code: str,
    service_request: str,
    approx_sqft: str | None = None,
    how_heard: str | None = None,
    desired_timeline: str | None = None,
) -> dict:
    """
    Save a qualified lead to BigQuery when all required info has been collected.

    Args:
        full_name: Customer's full name.
        phone: Best callback phone number.
        email: Customer's email address.
        city: City the customer is located in.
        zip_code: ZIP code of the service address.
        service_request: Description of work requested (service type + details).
        approx_sqft: Approximate square footage of home or area (optional).
        how_heard: How the customer found Pressure Washing Xperts (optional).
        desired_timeline: When the customer wants the work done (optional).

    Returns:
        dict with "ok": True on success, or "ok": False and "error" on failure.
    """
    project = os.environ.get("GOOGLE_CLOUD_PROJECT", "pressurewashing-xperts")
    dataset = os.environ.get("GOOGLE_LEADS_DATASET", "leads_crm")
    table   = os.environ.get("GOOGLE_LEADS_TABLE",   "inbound_leads")

    row = {
        "lead_id":           str(uuid.uuid4()),
        "created_at":        datetime.now(timezone.utc).isoformat(),
        "submission_source": "ai-agent-chat",
        "submission_type":   "chat-lead",
        "full_name":         full_name.strip(),
        "phone":             phone.strip(),
        "email":             email.strip(),
        "city":              city.strip(),
        "state":             "GA",
        "zip":               zip_code.strip(),
        "service_request":   service_request.strip(),
        "approx_sqft_estimate": (approx_sqft or "").strip() or None,
        "how_heard":         (how_heard or "").strip() or None,
        "desired_timeline":  (desired_timeline or "").strip() or None,
    }

    try:
        client = bigquery.Client(project=project)
        errors = client.insert_rows_json(f"{project}.{dataset}.{table}", [row])
        if errors:
            return {"ok": False, "error": str(errors)}
        return {"ok": True}
    except Exception as exc:  # noqa: BLE001
        return {"ok": False, "error": str(exc)}
