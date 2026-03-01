# 📚 School Management API

Backend-сервіс для управління навчальними групами, студентами та інтеграцією із зовнішніми курсами.

Проєкт побудований на NestJS та використовує PostgreSQL як основну базу даних.

---

# 🏗 Архітектура проєкту

Проєкт реалізовано за модульною архітектурою з чітким розділенням відповідальності:

src/
 ├── groups/      # Управління групами
 ├── students/    # Управління студентами
 ├── external/    # Інтеграція із зовнішнім API
 ├── common/      # Фільтри помилок та утиліти
test/             # E2E тести

## 🔹 src/groups/
- Агрегація активних груп
- Додавання студентів через транзакції
- SQL-агрегація

## 🔹 src/students/
- Валідація унікальності email
- Створення профілів студентів

## 🔹 src/external/
- Інтеграція із зовнішнім API
- Кешування
- Data Mapping (трансформація даних)

## 🔹 src/common/
- Глобальні фільтри винятків
- Загальні утиліти

---

# 🔌 Інтеграція із зовнішнім API

Використовується сервіс:
https://fakestoreapi.com

## Реалізація

- HTTP-клієнт: Axios
- Timeout: 3000ms
- Data Mapping — клієнту повертаються лише:
  - id
  - title
  - price

---

# 🧠 Кешування

Реалізовано In-memory cache:

- TTL: 5 хвилин
- Fallback-логіка:
  - Якщо API недоступний → повертаються дані з кешу
  - Якщо API недоступний і кеш порожній → 503 Service Unavailable

Це забезпечує відмовостійкість системи.

---

# 🛠 Чому обрано NestJS

## ✅ Модульність
Легке масштабування та розділення логіки.

## ✅ Dependency Injection
Спрощує тестування та підтримку.

## ✅ TypeScript-first
Мінімізує помилки під час розробки.

## ✅ Стандартизована структура
Підходить для командної розробки.

---

# ⚙️ Конфігурація середовища

У проєкті присутній файл:

.env.example

Він містить приклад необхідних змінних середовища.

## 🔹 Створення .env

```bash
cp .env.example .env
```

Після цього за потреби відредагуйте значення змінних.

---

# 🚀 Запуск проєкту

## 🐳 Запуск через Docker (рекомендовано)

### Вимоги:
- Docker
- Docker Compose

### Команди:

```bash
docker compose down
docker compose build --no-cache
docker compose up
```

### Після запуску:

- API: http://localhost:3000  
- PostgreSQL: порт 5432

---

## 💻 Локальний запуск (без Docker)

### 1️⃣ Встановлення залежностей

```bash
npm install
```

### 2️⃣ Створення .env

```bash
cp .env.example .env
```

### 3️⃣ Запуск у режимі розробки

```bash
npm run start:dev
```

### 4️⃣ Production-збірка

```bash
npm run build
npm run start:prod
```

---

# 🧪 Тестування

## ▶ Unit-тести

```bash
npm run test
```

## ▶ E2E-тести

```bash
npm run test:e2e
```

## ▶ Покриття тестами

```bash
npm run test:cov
```

---

# 📌 Основні ендпоінти

| Метод | Endpoint | Опис |
|-------|----------|------|
| POST  | /students | Створення студента |
| GET   | /groups | Отримати всі групи |
| GET   | /groups/active | Отримати активні групи |
| POST  | /groups/:groupId/students | Додати студента до групи |
| GET   | /external/courses | Отримати курси |

---

# 🧱 Технологічний стек

- NestJS
- TypeORM
- PostgreSQL
- Axios
- Docker
- Jest

---

# 📦 Корисні команди

```bash
# Збірка
npm run build

# Запуск dev
npm run start:dev

# Запуск prod
npm run start:prod

# Лінтинг
npm run lint

# Тести
npm run test
npm run test:e2e
npm run test:cov
```

---

# 🏁 Підсумок

Проєкт є production-ready backend-сервісом із:

- Чистою архітектурою
- Інтеграцією із зовнішнім API
- Кешуванням
- Покриттям тестами
- Docker-оточенням