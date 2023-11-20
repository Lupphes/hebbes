FROM python:3.11-slim

# Set the working directory
WORKDIR /usr/src/scraper

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the scraper code into the container
COPY . .

# Default command (this can be changed based on how you intend to run the scraper)
CMD ["python", "main.py"]
