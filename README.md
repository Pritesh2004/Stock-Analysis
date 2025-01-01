# News Headlines Driven Stock Sentiment Analysis

## Overview
News Headlines Driven Stock Sentiment Analysis is a machine learning-based project designed to predict stock price movements by analyzing the sentiment of news headlines. The project integrates stock price data with sentiment analysis from news articles, using two machine learning models—Random Forest and XGBoost—to predict stock price changes. The news data is sourced from a Kaggle general news dataset and a relevant dataset from the Wall Street Journal (WSJ), scraped using WebHarvey. The backend prediction API is built using Flask, the frontend is powered by Angular, and user authentication is managed with Spring Boot and Firebase.

## Features
- **Stock Price Prediction**: Predicts stock price movements based on sentiment derived from news headlines.
- **News Sentiment Analysis**: Analyzes and classifies news headlines into positive, negative, or neutral sentiments.
- **Machine Learning Models**: Utilizes Random Forest and XGBoost for stock price prediction.
- **Stock and News Data Integration**: Integrates stock data with news sentiment to enhance prediction accuracy.
- **User Authentication**: Secure login and registration via Firebase for personalized access.
- **Frontend Interface**: Displays predictions, sentiment analysis, and visualizations using Angular.

## Technologies Used

### Backend:
- **Flask**: A micro web framework for creating the prediction API.
- **Spring Boot**: Used for handling user information and authentication.
- **Firebase**: Provides secure user authentication and data storage.

### Machine Learning:
- **Random Forest**: A model used to predict stock price behavior based on sentiment data.
- **XGBoost**: A powerful model for improving prediction accuracy by learning complex patterns.

### Frontend:
- **Angular**: A platform for building the user interface that showcases stock predictions and sentiment analysis results.
- **HTML/CSS**: For creating the frontend structure and styling.

### Data:
- **Stock Price Dataset**: Historical stock price data used to map sentiment to stock price movements.
- **News Dataset**:
  - **General Dataset**: Sourced from Kaggle, it provides a variety of news articles for sentiment analysis.
  - **Relevant Dataset**: Financial news scraped from the Wall Street Journal (WSJ) using WebHarvey.

## Getting Started

### Prerequisites
- Python 3.x
- Java Development Kit (JDK) 11 or later
- Node.js and npm (Node Package Manager)
- MySQL Server
- Firebase account for authentication

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pritesh2004/Stock-Analysis.git
