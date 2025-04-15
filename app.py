"""

- Import uvicorn: Uvicorn is an ASGI (Asynchronous Server Gateway Interface) server that runs your
  FastAPI application.

- Run the application: The uvicorn.run() function starts the server with your application.

    "app.main:app" tells uvicorn to look for the app variable in the app.main module
    host="0.0.0.0" makes the server accessible from any network interface
    port=8000 sets the port number
    reload=True enables auto-reload when code changes (great for development)
"""

import uvicorn
import sys


def main():
    print("Starting server...")
    try:
        uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
