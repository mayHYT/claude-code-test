"""Tests for main.py module."""

import pytest
from main import app, get_something, UserService


class TestApp:
    """Test Flask app routes"""

    def test_get_users(self):
        """Test GET /api/users endpoint"""
        client = app.test_client()
        response = client.get("/api/users")
        assert response.status_code == 200
        data = response.get_json()
        assert len(data) == 2
        assert data[0]["name"] == "Alice"

    def test_bad_code(self):
        """Test GET /api/bad endpoint"""
        client = app.test_client()
        response = client.get("/api/bad")
        assert response.status_code == 200


class TestHelperFunctions:
    """Test helper functions"""

    def test_get_something(self):
        """Test get_something function"""
        result = get_something()
        assert result == {"key": "value"}

    def test_unused_function(self):
        """Test unused_function (for coverage)"""
        from main import unused_function

        result = unused_function()
        assert result is True


class TestUserService:
    """Test UserService class"""

    def test_connect(self):
        """Test UserService connect method"""
        service = UserService("test://db")
        assert service.connected is False
        service.connect()
        assert service.connected is True

    def test_disconnect(self):
        """Test UserService disconnect method"""
        service = UserService("test://db")
        service.connect()
        service.disconnect()
        assert service.connected is False

    def test_get_user_by_id_not_connected(self):
        """Test get_user_by_id raises error when not connected"""
        service = UserService("test://db")
        with pytest.raises(Exception, match="Not connected to database"):
            service.get_user_by_id(1)

    def test_get_user_by_id_connected(self):
        """Test get_user_by_id returns user when connected"""
        service = UserService("test://db")
        service.connect()
        user = service.get_user_by_id(1)
        assert user["id"] == 1
        assert user["name"] == "Test User"
