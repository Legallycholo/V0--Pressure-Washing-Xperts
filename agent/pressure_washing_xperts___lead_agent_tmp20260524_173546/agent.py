from google.adk.agents import LlmAgent

from .prompt import SYSTEM_PROMPT
from .tools import submit_lead

root_agent = LlmAgent(
    model="gemini-2.5-flash",
    name="pressure_washing_xperts_lead_agent",
    description=(
        "Lead capture assistant for Pressure Washing Xperts. "
        "Greets visitors, presents current offers, answers service questions, "
        "and collects quote request information for Metro Atlanta customers."
    ),
    instruction=SYSTEM_PROMPT,
    tools=[submit_lead],
)
