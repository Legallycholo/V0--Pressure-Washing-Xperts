"""
Tools available to the Chris agent.
"""
import html
import os
from datetime import datetime, timezone

import requests

RESEND_API_URL = "https://api.resend.com/emails"


def _escape(value: str | None) -> str:
    return html.escape(value or "N/A")


def _send_lead_notification(row: dict) -> None:
    api_key = os.environ.get("RESEND_API_KEY")
    if not api_key:
        return

    location = ", ".join(
        part for part in [row.get("city"), row.get("state"), row.get("zip")] if part
    ) or "N/A"
    sent_at = datetime.now(timezone.utc).astimezone().strftime("%A, %B %d, %Y at %I:%M %p")

    body_html = f"""
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <tr>
          <td style="background:#0a2540;padding:28px 32px;">
            <p style="margin:0 0 4px 0;font-size:12px;font-weight:600;letter-spacing:1px;color:#f0b429;text-transform:uppercase;">Pressure Washing Xperts</p>
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">New Lead from Chris (AI Chat)</h1>
            <p style="margin:6px 0 0 0;font-size:13px;color:#8899aa;">{sent_at}</p>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px 0;">
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;letter-spacing:1px;color:#8899aa;text-transform:uppercase;">Contact</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:12px;">
                  <p style="margin:0;font-size:20px;font-weight:700;color:#0a2540;">{_escape(row.get("full_name"))}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:8px;">
                  <a href="tel:{_escape(row.get("phone"))}" style="font-size:16px;color:#0a72f5;text-decoration:none;font-weight:600;">📞 {_escape(row.get("phone"))}</a>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:8px;">
                  <a href="mailto:{_escape(row.get("email"))}" style="font-size:14px;color:#0a72f5;text-decoration:none;">✉️ {_escape(row.get("email"))}</a>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin:0;font-size:14px;color:#445566;">📍 {_escape(location)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td style="padding:20px 32px 0;"><hr style="border:none;border-top:1px solid #eef0f3;margin:0;" /></td></tr>

        <tr>
          <td style="padding:20px 32px 0;">
            <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:1px;color:#8899aa;text-transform:uppercase;">Project Details</p>
            <table width="100%" cellpadding="0" cellspacing="6">
              <tr>
                <td style="font-size:13px;color:#667788;width:40%;padding:4px 0;">Sqft estimate</td>
                <td style="font-size:13px;color:#0a2540;font-weight:600;">{_escape(row.get("approx_sqft_estimate"))}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#667788;padding:4px 0;vertical-align:top;">Description</td>
                <td style="font-size:13px;color:#0a2540;font-weight:600;">{_escape(row.get("message"))}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#667788;padding:4px 0;">Desired timeline</td>
                <td style="font-size:13px;color:#0a2540;font-weight:600;">{_escape(row.get("desired_timeline"))}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td style="padding:20px 32px 0;"><hr style="border:none;border-top:1px solid #eef0f3;margin:0;" /></td></tr>

        <tr>
          <td style="padding:20px 32px 28px;">
            <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:1px;color:#8899aa;text-transform:uppercase;">Lead Source</p>
            <table width="100%" cellpadding="0" cellspacing="6">
              <tr>
                <td style="font-size:13px;color:#667788;width:40%;padding:4px 0;">Source</td>
                <td style="font-size:13px;color:#0a2540;font-weight:600;">AI chat widget (Chris)</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#667788;padding:4px 0;">How heard</td>
                <td style="font-size:13px;color:#0a2540;font-weight:600;">{_escape(row.get("how_heard"))}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#f4f6f8;padding:16px 32px;border-top:1px solid #eef0f3;">
            <p style="margin:0;font-size:11px;color:#aabbcc;text-align:center;">Pressure Washing Xperts</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    """

    try:
        requests.post(
            RESEND_API_URL,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "from": "Dariel <dariel@tanygrowth.com>",
                "to": "pressurewashingxperts@gmail.com",
                "subject": f"🔔 New Lead: {row.get('full_name')} in {row.get('city') or 'Unknown'} ({row.get('phone')})",
                "html": body_html,
            },
            timeout=10,
        )
    except requests.RequestException as exc:  # noqa: BLE001
        print(f"[submit_lead] Resend notification failed: {exc}")


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
    Save a qualified lead to Supabase when all required info has been collected,
    and notify the team by email.

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
    row = {
        "full_name": full_name.strip(),
        "phone": phone.strip(),
        "email": email.strip(),
        "city": city.strip(),
        "state": "GA",
        "zip": zip_code.strip(),
        "message": service_request.strip(),
        "approx_sqft_estimate": (approx_sqft or "").strip() or None,
        "how_heard": (how_heard or "").strip() or None,
        "desired_timeline": (desired_timeline or "").strip() or None,
        "submission_type": "chat-lead",
        "submission_source": "ai-agent-chat",
    }

    result: dict
    try:
        supabase_url = os.environ["SUPABASE_URL"]
        supabase_service_role_key = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

        resp = requests.post(
            f"{supabase_url}/rest/v1/leads",
            headers={
                "apikey": supabase_service_role_key,
                "Authorization": f"Bearer {supabase_service_role_key}",
                "Content-Type": "application/json",
                "Prefer": "return=minimal",
            },
            json=row,
            timeout=10,
        )
        resp.raise_for_status()
        result = {"ok": True}
    except Exception as exc:  # noqa: BLE001
        result = {"ok": False, "error": str(exc)}

    # Notify the team even if the DB write failed, so no lead gets missed.
    _send_lead_notification(row)

    return result
