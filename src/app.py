from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Health:
    status: str = "ok"


def healthcheck() -> Health:
    """Minimal healthcheck endpoint equivalent.

    Kept intentionally tiny for MVP: validates the end-to-end DocOps+AgentOps chain.
    """
    return Health()
