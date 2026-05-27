# [LANG: EN]
# Data Science and Predictive Analytics
## Short Answer
**Data Science** is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. It combines elements of statistics, computer science, and domain expertise. **Predictive Analytics** is a crucial subset of data science that leverages statistical algorithms and machine learning techniques to identify the likelihood of future outcomes or trends based on historical and current data. Its primary goal is to forecast future events, behaviors, or performance.

## Key Concepts
*   **Data Collection & Preprocessing**: Gathering data from various sources (databases, APIs, files) and cleaning, transforming, and formatting it for analysis (e.g., handling missing values, outliers, data types).
*   **Exploratory Data Analysis (EDA)**: Analyzing data sets to summarize their main characteristics, often with visual methods, to discover patterns, detect anomalies, and test hypotheses.
*   **Feature Engineering**: The process of creating new input features from existing ones to improve the performance of machine learning models.
*   **Machine Learning (ML)**: Algorithms that learn from data to make predictions or decisions without being explicitly programmed (e.g., Supervised Learning, Unsupervised Learning).
*   **Statistical Modeling**: Using statistical methods and probability theory to build models that describe relationships between variables and make predictions (e.g., regression, classification).
*   **Model Training & Evaluation**: Fitting a model to training data and assessing its performance using metrics (e.g., RMSE, R², accuracy, precision, recall) on unseen test data.
*   **Model Deployment**: Integrating trained models into production systems to make real-time or batch predictions.
*   **Big Data Technologies**: Tools and frameworks (e.g., Apache Spark, Hadoop) for processing and analyzing very large and complex datasets.
*   **Business Understanding**: The ability to translate business problems into data science questions and interpret model results in a business context.

## Main Ideas Explained
Data Science encompasses the entire lifecycle of data, from acquisition to insight. The typical workflow involves defining a business problem, collecting relevant data, cleaning and preparing the data (which often consumes the majority of a data scientist's time), performing EDA to understand its characteristics, building predictive models using various ML or statistical techniques, evaluating model performance, and finally deploying and monitoring the model.

**Predictive analytics** is at the heart of many data science applications. It involves applying advanced analytical techniques to make predictions about future events. Common techniques include:
*   **Regression**: Predicting a continuous outcome (e.g., sales, stock prices, temperature).
*   **Classification**: Predicting a categorical outcome (e.g., customer churn, fraud detection, disease diagnosis).
*   **Time Series Forecasting**: Predicting future values based on historical time-stamped data (e.g., weather forecasting, demand prediction).

The effectiveness of predictive analytics heavily relies on the quality and relevance of the historical data. "Garbage in, garbage out" is a fundamental principle. Feature engineering is critical for extracting meaningful information from raw data that models can use to make better predictions. Model selection and validation (e.g., cross-validation) are crucial steps to ensure the model generalizes well to new, unseen data and avoids overfitting. Ultimately, the goal is to provide actionable insights that drive better decision-making in various domains, from finance and healthcare to marketing and operations.

## Useful Code Example
This Python example demonstrates a simple predictive analytics task: predicting house prices using linear regression with `scikit-learn`.

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# 1. Sample Data Generation (In a real scenario, you'd load from a CSV/DB)
np.random.seed(42)
data_size = 100
sq_footage = np.random.normal(2000, 500, data_size) # Square footage
num_bedrooms = np.random.randint(2, 5, data_size)    # Number of bedrooms
age = np.random.randint(5, 50, data_size)            # Age of the house
location_score = np.random.uniform(1, 10, data_size) # Location desirability score

# Simple price model: price = f(sq_footage, num_bedrooms, age, location_score) + noise
prices = (sq_footage * 150 + num_bedrooms * 20000 - age * 1000 + location_score * 5000 +
          np.random.normal(0, 50000, data_size))
prices = np.maximum(100000, prices) # Ensure prices are at least $100,000

data = pd.DataFrame({
    'SqFootage': sq_footage,
    'NumBedrooms': num_bedrooms,
    'Age': age,
    'LocationScore': location_score,
    'Price': prices
})

print("Sample Data Head:")
print(data.head())

# 2. Define Features (X) and Target (y)
X = data[['SqFootage', 'NumBedrooms', 'Age', 'LocationScore']] # Features
y = data['Price']                                               # Target variable

# 3. Split Data into Training and Testing Sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"\nTraining set size: {X_train.shape[0]} samples")
print(f"Test set size: {X_test.shape[0]} samples")

# 4. Initialize and Train the Linear Regression Model
model = LinearRegression()
model.fit(X_train, y_train)

print(f"\nModel Coefficients: {model.coef_}")
print(f"Model Intercept: {model.intercept_}")

# 5. Make Predictions on the Test Set
y_pred = model.predict(X_test)

# 6. Evaluate the Model
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"\n--- Model Evaluation ---")
print(f"Mean Squared Error (MSE): {mse:.2f}")
print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
print(f"R-squared (R2): {r2:.2f}") # R2 closer to 1 indicates better fit

# 7. Example of making a prediction for a new house
print(f"\n--- New Prediction ---")
new_house_features = pd.DataFrame([[2100, 3, 10, 8.5]],
                                  columns=['SqFootage', 'NumBedrooms', 'Age', 'LocationScore'])
predicted_price = model.predict(new_house_features)[0]
print(f"Features of new house: {new_house_features.values[0]}")
print(f"Predicted price for a new house: ${predicted_price:,.2f}")
```

## Learning Resources
*   **Online Courses**:
    *   **Coursera**: "IBM Data Science Professional Certificate", "Google Data Analytics Professional Certificate", "Applied Data Science with Python Specialization" (University of Michigan).
    *   **edX**: "Microsoft Professional Program in Data Science", "Data Science MicroMasters Program" (UC San Diego).
    *   **Udacity**: "Data Scientist Nanodegree".
*   **Books**:
    *   "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow" by Aurélien Géron.
    *   "Python for Data Analysis" by Wes McKinney.
    *   "An Introduction to Statistical Learning" by Gareth James et al. (Free PDF available online).
*   **Platforms & Communities**:
    *   **Kaggle**: Provides datasets, code notebooks, and competitions for practicing data science and machine learning.
    *   **Towards Data Science (Medium)**: A popular publication with articles on various data science topics, tutorials, and insights.
    *   **Stack Overflow**: For specific programming and technical questions.
*   **Key Libraries & Tools (Python)**:
    *   **Pandas**: For data manipulation and analysis.
    *   **NumPy**: For numerical computing.
    *   **Scikit-learn**: For machine learning algorithms.
    *   **Matplotlib, Seaborn**: For data visualization.
    *   **Jupyter Notebook/Lab**: Interactive computing environment.
    *   **TensorFlow / PyTorch**: For deep learning.

# [LANG: RU]
# Наука о данных и Прогнозная Аналитика
## Краткий ответ
**Наука о данных (Data Science)** – это междисциплинарная область, которая использует научные методы, процессы, алгоритмы и системы для извлечения знаний и понимания из структурированных и неструктурированных данных. Она объединяет элементы статистики, компьютерных наук и предметной экспертизы. **Прогнозная аналитика (Predictive Analytics)** является ключевым подмножеством науки о данных, которое использует статистические алгоритмы и методы машинного обучения для определения вероятности будущих результатов или тенденций на основе исторических и текущих данных. Ее основная цель – прогнозировать будущие события, поведение или производительность.

## Ключевые концепции
*   **Сбор и предварительная обработка данных**: Сбор данных из различных источников (базы данных, API, файлы), а также их очистка, преобразование и форматирование для анализа (например, обработка пропущенных значений, выбросов, типов данных).
*   **Разведочный анализ данных (EDA)**: Анализ наборов данных для суммирования их основных характеристик, часто с использованием визуальных методов, для обнаружения закономерностей, аномалий и проверки гипотез.
*   **Разработка признаков (Feature Engineering)**: Процесс создания новых входных признаков из существующих для улучшения производительности моделей машинного обучения.
*   **Машинное обучение (ML)**: Алгоритмы, которые обучаются на данных для создания прогнозов или принятия решений без явного программирования (например, обучение с учителем, без учителя).
*   **Статистическое моделирование**: Использование статистических методов и теории вероятностей для построения моделей, описывающих взаимосвязи между переменными и делающих прогнозы (например, регрессия, классификация).
*   **Обучение и оценка модели**: Подгонка модели к обучающим данным и оценка ее производительности с использованием метрик (например, RMSE, R², точность, полнота) на невиданных тестовых данных.
*   **Развертывание модели**: Интеграция обученных моделей в производственные системы для создания прогнозов в реальном времени или в пакетном режиме.
*   **Технологии больших данных**: Инструменты и фреймворки (например, Apache Spark, Hadoop) для обработки и анализа очень больших и сложных наборов данных.
*   **Понимание бизнеса**: Способность переводить бизнес-проблемы в вопросы науки о данных и интерпретировать результаты модели в бизнес-контексте.

## Основные идеи
Наука о данных охватывает весь жизненный цикл данных, от сбора до получения инсайтов. Типичный рабочий процесс включает в себя определение бизнес-проблемы, сбор соответствующих данных, очистку и подготовку данных (что часто занимает большую часть времени специалиста по данным), проведение EDA для понимания их характеристик, построение прогнозных моделей с использованием различных методов ML или статистических методов, оценку производительности модели и, наконец, развертывание и мониторинг модели.

**Прогнозная аналитика** лежит в основе многих приложений науки о данных. Она включает применение передовых аналитических методов для прогнозирования будущих событий. Общие методы включают:
*   **Регрессия**: Прогнозирование непрерывного результата (например, продажи, цены акций, температура).
*   **Классификация**: Прогнозирование категориального результата (например, отток клиентов, обнаружение мошенничества, диагностика заболеваний).
*   **Прогнозирование временных рядов**: Прогнозирование будущих значений на основе исторических данных с привязкой ко времени (например, прогнозирование погоды, прогнозирование спроса).

Эффективность прогнозной аналитики сильно зависит от качества и релевантности исторических данных. «Мусор на входе — мусор на выходе» — фундаментальный принцип. Разработка признаков имеет решающее значение для извлечения значимой информации из необработанных данных, которую модели могут использовать для улучшения прогнозов. Выбор и валидация модели (например, перекрестная проверка) являются важнейшими шагами для обеспечения хорошей обобщающей способности модели на новые, невиданные данные и предотвращения переобучения. В конечном итоге, цель состоит в предоставлении действенных инсайтов, которые способствуют принятию более обоснованных решений в различных областях, от финансов и здравоохранения до маркетинга и операций.

## Полезный пример кода
Этот пример на Python демонстрирует простую задачу прогнозной аналитики: прогнозирование цен на дома с использованием линейной регрессии с библиотекой `scikit-learn`.

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# 1. Генерация примера данных (в реальном сценарии вы бы загружали данные из CSV/БД)
np.random.seed(42)
data_size = 100
sq_footage = np.random.normal(2000, 500, data_size) # Площадь в квадратных футах
num_bedrooms = np.random.randint(2, 5, data_size)    # Количество спален
age = np.random.randint(5, 50, data_size)            # Возраст дома
location_score = np.random.uniform(1, 10, data_size) # Оценка привлекательности района

# Простая модель цены: цена = f(площадь, кол-во спален, возраст, оценка расположения) + шум
prices = (sq_footage * 150 + num_bedrooms * 20000 - age * 1000 + location_score * 5000 +
          np.random.normal(0, 50000, data_size))
prices = np.maximum(100000, prices) # Убедимся, что цены не ниже $100,000

data = pd.DataFrame({
    'SqFootage': sq_footage,
    'NumBedrooms': num_bedrooms,
    'Age': age,
    'LocationScore': location_score,
    'Price': prices
})

print("Пример заголовка данных:")
print(data.head())

# 2. Определите признаки (X) и целевую переменную (y)
X = data[['SqFootage', 'NumBedrooms', 'Age', 'LocationScore']] # Признаки
y = data['Price']                                               # Целевая переменная

# 3. Разделите данные на обучающие и тестовые наборы
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"\nРазмер обучающего набора: {X_train.shape[0]} образцов")
print(f"Размер тестового набора: {X_test.shape[0]} образцов")

# 4. Инициализируйте и обучите модель линейной регрессии
model = LinearRegression()
model.fit(X_train, y_train)

print(f"\nКоэффициенты модели: {model.coef_}")
print(f"Пересечение модели: {model.intercept_}")

# 5. Сделайте прогнозы на тестовом наборе
y_pred = model.predict(X_test)

# 6. Оцените модель
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"\n--- Оценка модели ---")
print(f"Среднеквадратичная ошибка (MSE): {mse:.2f}")
print(f"Корень из среднеквадратичной ошибки (RMSE): {rmse:.2f}")
print(f"Коэффициент детерминации (R2): {r2:.2f}") # R2 ближе к 1 указывает на лучшее соответствие

# 7. Пример прогнозирования для нового дома
print(f"\n--- Новый прогноз ---")
new_house_features = pd.DataFrame([[2100, 3, 10, 8.5]],
                                  columns=['SqFootage', 'NumBedrooms', 'Age', 'LocationScore'])
predicted_price = model.predict(new_house_features)[0]
print(f"Признаки нового дома: {new_house_features.values[0]}")
print(f"Прогнозируемая цена для нового дома: ${predicted_price:,.2f}")
```

## Ресурсы для обучения
*   **Онлайн-курсы**:
    *   **Coursera**: "IBM Data Science Professional Certificate", "Google Data Analytics Professional Certificate", "Applied Data Science with Python Specialization" (Университет Мичигана).
    *   **edX**: "Microsoft Professional Program in Data Science", "Data Science MicroMasters Program" (Калифорнийский университет в Сан-Диего).
    *   **Udacity**: "Data Scientist Nanodegree".
*   **Книги**:
    *   "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow" Орельена Герона.
    *   "Python for Data Analysis" Уэса МакКинни.
    *   "An Introduction to Statistical Learning" Гарета Джеймса и др. (Бесплатный PDF доступен онлайн).
*   **Платформы и сообщества**:
    *   **Kaggle**: Предоставляет наборы данных, блокноты кода и конкурсы для практики в области науки о данных и машинного обучения.
    *   **Towards Data Science (Medium)**: Популярное издание со статьями по различным темам науки о данных, учебными пособиями и инсайтами.
    *   **Stack Overflow**: Для конкретных вопросов по программированию и техническим вопросам.
*   **Основные библиотеки и инструменты (Python)**:
    *   **Pandas**: Для манипуляции и анализа данных.
    *   **NumPy**: Для численных вычислений.
    *   **Scikit-learn**: Для алгоритмов машинного обучения.
    *   **Matplotlib, Seaborn**: Для визуализации данных.
    *   **Jupyter Notebook/Lab**: Интерактивная вычислительная среда.
    *   **TensorFlow / PyTorch**: Для глубокого обучения.

# [LANG: UZ]
# Ma'lumotlar Ilmi va Prognozli Tahlil
## Qisqa javob
**Ma'lumotlar Ilmi (Data Science)** – bu ilmiy usullar, jarayonlar, algoritmlar va tizimlardan foydalanib, tuzilgan va tuzilmagan ma'lumotlardan bilim va tushunchalarni olishga qaratilgan fanlararo soha. U statistika, kompyuter fanlari va soha ekspertizasini birlashtiradi. **Prognozli Tahlil (Predictive Analytics)** ma'lumotlar ilm-fanining muhim kichik sohasi bo'lib, tarixiy va joriy ma'lumotlar asosida kelajakdagi natijalar yoki tendentsiyalar ehtimolini aniqlash uchun statistik algoritmlar va mashina o'rganish usullaridan foydalanadi. Uning asosiy maqsadi kelajakdagi voqealar, xatti-harakatlar yoki ish faoliyatini bashorat qilishdir.

## Asosiy tushunchalar
*   **Ma'lumotlarni yig'ish va oldindan ishlash**: Ma'lumotlarni turli manbalardan (ma'lumotlar bazalari, APIlar, fayllar) yig'ish va ularni tahlil qilish uchun tozalash, o'zgartirish va formatlash (masalan, yetishmayotgan qiymatlarni, chetga chiqmalarni, ma'lumotlar turlarini boshqarish).
*   **Tadqiqiy Ma'lumotlarni Tahlil qilish (EDA)**: Ma'lumotlar to'plamlarining asosiy xususiyatlarini umumlashtirish, ko'pincha vizual usullar bilan, naqshlarni aniqlash, anomaliyalarni topish va gipotezalarni sinash uchun tahlil qilish.
*   **Xususiyatlarni injeneringi (Feature Engineering)**: Mashina o'rganish modellarining ish faoliyatini yaxshilash uchun mavjud xususiyatlardan yangi kiritish xususiyatlarini yaratish jarayoni.
*   **Mashina O'rganish (ML)**: Ma'lumotlardan o'rganib, aniq dasturlashtirilmagan holda bashoratlar yoki qarorlar qabul qiladigan algoritmlar (masalan, Nazoratli o'rganish, Nazoratsiz o'rganish).
*   **Statistik Modellashtirish**: O'zgaruvchilar orasidagi munosabatlarni tasvirlaydigan va bashoratlar qiladigan modellar yaratish uchun statistik usullar va ehtimollar nazariyasidan foydalanish (masalan, regressiya, klassifikatsiya).
*   **Modelni o'qitish va baholash**: Modelni o'qitish ma'lumotlariga moslashtirish va uning ish faoliyatini ko'rilmagan test ma'lumotlarida metrikalar (masalan, RMSE, R², aniqlik, ishonchlilik, qaytarish) yordamida baholash.
*   **Modelni joylashtirish (Deployment)**: O'qitilgan modellarni real vaqtda yoki paketli bashoratlar qilish uchun ishlab chiqarish tizimlariga integratsiya qilish.
*   **Katta Ma'lumotlar Texnologiyalari (Big Data Technologies)**: Juda katta va murakkab ma'lumotlar to'plamlarini qayta ishlash va tahlil qilish uchun vositalar va freymvorklar (masalan, Apache Spark, Hadoop).
*   **Biznesni tushunish**: Biznes muammolarini ma'lumotlar ilmi savollariga aylantirish va model natijalarini biznes kontekstida izohlash qobiliyati.

## Asosiy g'oyalar tushuntirilgan
Ma'lumotlar ilmi ma'lumotlarning butun hayot siklini, ularni yig'ishdan tortib to tushunchalarni olishgacha bo'lgan barcha jarayonlarni o'z ichiga oladi. Odatiy ish jarayoni biznes muammosini aniqlash, tegishli ma'lumotlarni yig'ish, ma'lumotlarni tozalash va tayyorlash (bu ko'pincha ma'lumotlar olimining vaqtining ko'p qismini tashkil etadi), uning xususiyatlarini tushunish uchun EDA o'tkazish, turli ML yoki statistik usullardan foydalanib prognozli modellar yaratish, model ish faoliyatini baholash va nihoyat, modelni joylashtirish va monitoring qilishni o'z ichiga oladi.

**Prognozli tahlil** ko'plab ma'lumotlar ilmi ilovalarining asosida yotadi. U kelajakdagi voqealar haqida bashorat qilish uchun ilg'or analitik usullarni qo'llashni o'z ichiga oladi. Umumiy usullar quyidagilarni o'z ichiga oladi:
*   **Regressiya**: Uzluksiz natijani bashorat qilish (masalan, savdolar, qimmatli qog'ozlar narxi, harorat).
*   **Klassifikatsiya**: Kategoriyali natijani bashorat qilish (masalan, mijozlarning ketishi, firibgarlikni aniqlash, kasallik diagnostikasi).
*   **Vaqt seriyalari prognozi**: Tarixiy vaqt tamg'ali ma'lumotlarga asoslanib kelajakdagi qiymatlarni bashorat qilish (masalan, ob-havo prognozi, talab prognozi).

Prognozli tahlilning samaradorligi tarixiy ma'lumotlarning sifati va dolzarbligiga juda bog'liq. "Kirishda axlat — chiqishda axlat" degan tamoyil asosiy hisoblanadi. Xususiyatlarni injeneringi xom ma'lumotlardan modellarni yaxshiroq bashorat qilish uchun foydalanishi mumkin bo'lgan mazmunli ma'lumotlarni olishda muhim ahamiyatga ega. Modelni tanlash va validatsiya (masalan, kross-validatsiya) modelning yangi, ko'rilmagan ma'lumotlarga yaxshi umumlashtirilishini va ortiqcha moslashuvdan qochishini ta'minlash uchun muhim qadamlardir. Yakuniy maqsad moliyadan tortib sog'liqni saqlashgacha, marketingdan tortib operatsiyalargacha bo'lgan turli sohalarda yaxshiroq qarorlar qabul qilishga yordam beradigan amaliy tushunchalarni taqdim etishdir.

## Foydali kod misoli
Ushbu Python misoli oddiy prognozli tahlil vazifasini namoyish etadi: `scikit-learn` yordamida chiziqli regressiya yordamida uy narxlarini bashorat qilish.

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# 1. Misol ma'lumotlarini yaratish (Haqiqiy senariyda siz CSV/DB dan yuklaysiz)
np.random.seed(42)
data_size = 100
sq_footage = np.random.normal(2000, 500, data_size) # Kvadrat metr maydon
num_bedrooms = np.random.randint(2, 5, data_size)    # Yotoqxonalar soni
age = np.random.randint(5, 50, data_size)            # Uyning yoshi
location_score = np.random.uniform(1, 10, data_size) # Joylashuvning jozibadorlik ko'rsatkichi

# Oddiy narx modeli: narx = f(maydon, yotoqxonalar soni, yoshi, joylashuv ko'rsatkichi) + shovqin
prices = (sq_footage * 150 + num_bedrooms * 20000 - age * 1000 + location_score * 5000 +
          np.random.normal(0, 50000, data_size))
prices = np.maximum(100000, prices) # Narxlar kamida $100,000 bo'lishini ta'minlash

data = pd.DataFrame({
    'SqFootage': sq_footage,
    'NumBedrooms': num_bedrooms,
    'Age': age,
    'LocationScore': location_score,
    'Price': prices
})

print("Misol ma'lumotlar boshlanishi:")
print(data.head())

# 2. Xususiyatlar (X) va Maqsad (y) ni aniqlash
X = data[['SqFootage', 'NumBedrooms', 'Age', 'LocationScore']] # Xususiyatlar
y = data['Price']                                               # Maqsad o'zgaruvchisi

# 3. Ma'lumotlarni o'qitish va test to'plamlariga ajratish
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"\nO'qitish to'plami hajmi: {X_train.shape[0]} namunalar")
print(f"Test to'plami hajmi: {X_test.shape[0]} namunalar")

# 4. Chiziqli Regressiya Modelini ishga tushirish va o'qitish
model = LinearRegression()
model.fit(X_train, y_train)

print(f"\nModel koeffitsientlari: {model.coef_}")
print(f"Model intercept: {model.intercept_}")

# 5. Test to'plamida bashorat qilish
y_pred = model.predict(X_test)

# 6. Modelni baholash
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"\n--- Modelni baholash ---")
print(f"O'rtacha kvadratik xato (MSE): {mse:.2f}")
print(f"O'rtacha kvadratik xatoning ildizi (RMSE): {rmse:.2f}")
print(f"R-kvadrat (R2): {r2:.2f}") # R2 qiymati 1 ga yaqinroq bo'lsa, moslashuv yaxshiroq

# 7. Yangi uy uchun bashorat qilish misoli
print(f"\n--- Yangi bashorat ---")
new_house_features = pd.DataFrame([[2100, 3, 10, 8.5]],
                                  columns=['SqFootage', 'NumBedrooms', 'Age', 'LocationScore'])
predicted_price = model.predict(new_house_features)[0]
print(f"Yangi uyning xususiyatlari: {new_house_features.values[0]}")
print(f"Yangi uy uchun bashorat qilingan narx: ${predicted_price:,.2f}")
```

## O'rganish resurslari
*   **Onlayn kurslar**:
    *   **Coursera**: "IBM Data Science Professional Certificate", "Google Data Analytics Professional Certificate", "Applied Data Science with Python Specialization" (Michigan universiteti).
    *   **edX**: "Microsoft Professional Program in Data Science", "Data Science MicroMasters Program" (UC San Diego).
    *   **Udacity**: "Data Scientist Nanodegree".
*   **Kitoblar**:
    *   "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow" Aurélien Géron tomonidan.
    *   "Python for Data Analysis" Wes McKinney tomonidan.
    *   "An Introduction to Statistical Learning" Gareth James va boshqalar tomonidan (Bepul PDF onlayn mavjud).
*   **Platformalar va jamoalar**:
    *   **Kaggle**: Ma'lumotlar ilmi va mashina o'rganishni amaliyot qilish uchun ma'lumotlar to'plamlari, kod notebooklari va tanlovlarni taqdim etadi.
    *   **Towards Data Science (Medium)**: Turli ma'lumotlar ilmi mavzulari, qo'llanmalar va tushunchalar haqidagi maqolalari bilan mashhur nashr.
    *   **Stack Overflow**: Muayyan dasturlash va texnik savollar uchun.
*   **Asosiy kutubxonalar va vositalar (Python)**:
    *   **Pandas**: Ma'lumotlarni manipulyatsiya qilish va tahlil qilish uchun.
    *   **NumPy**: Raqamli hisoblash uchun.
    *   **Scikit-learn**: Mashina o'rganish algoritmlari uchun.
    *   **Matplotlib, Seaborn**: Ma'lumotlarni vizuallashtirish uchun.
    *   **Jupyter Notebook/Lab**: Interfaol hisoblash muhiti.
    *   **TensorFlow / PyTorch**: Chuqur o'rganish uchun.