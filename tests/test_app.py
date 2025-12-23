from src.app import Health, health_payload, healthcheck


def test_healthcheck_returns_ok():
    assert healthcheck() == Health(status="ok")


def test_health_payload_is_json_serializable_shape():
    assert health_payload() == {"status": "ok"}