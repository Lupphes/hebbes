# Price Bandit

The SDE project making the shopping easier, cheaper and more fun!

## Project Structure

```
price_bandit/
|-- frontend/
|   |-- Dockerfile
|   |-- package.json
|   |-- ...
|
|-- backend/
|   |-- Dockerfile
|   |-- requirements.txt
|   |-- app.py
|   |-- ...
|
|-- scraper/
|   |-- Dockerfile
|   |-- requirements.txt
|   |-- scraper.py
|
|-- docker-compose.yml
```

## Resources

- Microservices: Look up tutorials and articles on microservices to understand the principles and best practices in depth.
- Docker Compose: The official Docker documentation provides comprehensive details and examples.
- Flask/FastAPI: Both Flask and FastAPI have ample resources online for creating a simple API.

## Web Scraping Precautions

Web scraping can be tricky and may lead to potential pitfalls such as:

- IP bans
- Handling CAPTCHAs
- Respecting robots.txt

Ensure that your scraping is legal and ethical. Always respect the website's terms of service and privacy policies.

## Commit and PR Rules

1. **Protected master branch**: Direct commits to the master branch are prohibited.
2. **Branching**: Always create a new branch for your changes. Name your branch based on the feature or fix you're working on, preferably linking to an issue number. E.g., `feature-12-add-new-filter` or `fix-15-resolve-login-bug`.
3. **Commit Messages**:
   - Commits should be categorized using prefixes like `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, and `test:`.
   - Use meaningful commit messages that clearly describe the change.
   - Incorporate the GitHub issue number at the beginning, e.g., `feat(#12): Added new filter functionality`.
4. **Pull Requests (PRs)**:
   - Each PR must be associated with a GitHub issue.
   - PRs should have descriptive titles and should explain the purpose and content of the changes.
   - Each PR must have at least one review before merging.
   - After reviews and any necessary adjustments, the PR can be merged into the master branch.

## Template for Commit Messages

```
[prefix(#GitHub Issue Number)]: Short description of the change

For example:
feat(#12): Add new filter functionality

(Optional) A more detailed description can follow if required. It should provide context for the change, detail on the solution, or any other pertinent information.
```

This README should give a clear overview of the project and lay down some basic rules for collaboration.

## Launching with Docker Compose

To get the project up and running using Docker, ensure you have both [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

Follow these steps:

1. Navigate to the root directory of the project:

```bash
cd price-bandit
```

2. Build and start the services defined in docker-compose.yaml:

```bash
docker-compose up --build
```

- The --build flag ensures that Docker builds images before starting the containers.

3. Once all services are up, you should be able to access the frontend application, typically via `http://localhost:3000` or the port defined in `docker-compose.yaml`.

4. To stop the services:

```bash
docker-compose down
```

Remember to always check the logs or console output to ensure that all services have started correctly and there are no errors.

You can append this section to the end of your `README.md` to guide users or developers on how to launch the project with Docker Compose.
