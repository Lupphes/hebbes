FROM python:3.11-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Bundle app source
COPY . .

# 
CMD ["uvicorn", "app:price_bandit", "--host", "0.0.0.0", "--port", "5000"]