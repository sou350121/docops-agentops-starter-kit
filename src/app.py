from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Health:
    status: str = "ok"

    def to_dict(self) -> dict[str, str]:
        return {"status": self.status}


def healthcheck() -> Health:
    """Minimal healthcheck endpoint equivalent.

    Kept intentionally tiny for MVP: validates the end-to-end DocOps+AgentOps chain.
    """
    return Health()


def health_payload() -> dict[str, str]:
    """JSON-serializable health payload.

    This is the story deliverable for S-0001-healthcheck.
    """
    return healthcheck().to_dict()
