from src.app import Health, healthcheck


def test_healthcheck_returns_ok():
    assert healthcheck() == Health(status="ok")
