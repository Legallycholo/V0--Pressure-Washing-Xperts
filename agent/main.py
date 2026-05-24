"""
Vertex AI Agent Engine entrypoint.
Vertex AI loads this module and uses the `app` object.
"""
import os
import vertexai
from vertexai.agent_engines import AdkApp

from pressure_washing_xperts___lead_agent.agent import root_agent

vertexai.init(
    project=os.environ.get("GOOGLE_CLOUD_PROJECT", "pressurewashing-xperts"),
    location=os.environ.get("GOOGLE_CLOUD_LOCATION", "us-west1"),
)

app = AdkApp(
    agent=root_agent,
    enable_tracing=False,
)
