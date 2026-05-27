# [LANG: EN]
# Reinforcement Learning
## Short Answer
Reinforcement Learning (RL) is a paradigm within machine learning where an "agent" learns to make optimal decisions by interacting with an "environment." The agent receives "rewards" or "penalties" based on its "actions" and aims to discover a "policy"—a strategy—that maximizes the cumulative reward over time, without explicit programming for every possible scenario.

## Key Concepts
*   **Agent:** The learner or decision-maker.
*   **Environment:** Everything outside the agent that it interacts with.
*   **State (S):** A complete description of the current situation in the environment.
*   **Action (A):** A move or decision made by the agent within the environment.
*   **Reward (R):** A numerical feedback signal from the environment indicating the desirability of an action taken from a state. The agent's goal is to maximize cumulative reward.
*   **Policy (π):** A mapping from states to actions, defining the agent's behavior.
*   **Value Function (V or Q):** A prediction of future rewards, used to evaluate how good a state or an action taken from a state is.
    *   **State-Value Function (V(s)):** Expected return starting from state `s` and following policy `π`.
    *   **Action-Value Function (Q(s, a)):** Expected return starting from state `s`, taking action `a`, and then following policy `π`.
*   **Model:** An optional component that mimics the environment's behavior, predicting the next state and reward given a current state and action.
*   **Exploration vs. Exploitation:** The dilemma between trying new, potentially better actions (exploration) and sticking to known good actions (exploitation).

## Main Ideas Explained
1.  **Agent-Environment Interaction Loop:** RL operates through a continuous loop. At each time step, the agent observes the current state of the environment, selects an action according to its policy, executes that action, and then the environment transitions to a new state and provides a reward signal. This feedback loop allows the agent to learn.
2.  **Goal-Oriented Learning:** Unlike supervised learning which learns from labeled data or unsupervised learning which finds patterns, RL aims for goal-oriented learning. The agent's ultimate objective is to find an optimal policy that maximizes the total expected discounted cumulative reward over its lifetime within the environment.
3.  **Policy Optimization:** The core of RL is to find an optimal policy (π*) that dictates the best action to take in any given state. This can be achieved either by:
    *   **Value-based methods:** Estimating the value functions (Q or V) and deriving the policy from them (e.g., Q-learning, SARSA, Deep Q-Networks).
    *   **Policy-based methods:** Directly searching for the optimal policy in the policy space (e.g., REINFORCE, Actor-Critic methods).
    *   **Model-based methods:** Building or learning a model of the environment to plan and predict outcomes.
4.  **Temporal Difference Learning:** Many RL algorithms, like Q-learning and SARSA, use temporal difference (TD) learning. TD methods learn directly from experience, updating value estimates based on other learned value estimates, rather than waiting for final outcomes. This allows learning to occur continually and in environments with long sequences of actions.
5.  **Markov Decision Processes (MDPs):** The theoretical framework underpinning most RL problems. An MDP describes an environment where states possess the Markov property (the future depends only on the current state, not the past history). It is defined by states, actions, transition probabilities, and rewards.

## Useful Code Example
This Python example demonstrates a simple Q-learning algorithm for a toy environment (e.g., a simple grid world or FrozenLake from OpenAI Gym).

```python
import numpy as np
import gym

# 1. Setup the environment
env = gym.make("FrozenLake-v1", is_slippery=False) # Use is_slippery=False for a simpler start
# env = gym.make("FrozenLake-v1") # For a more challenging, slippery environment
state_space_size = env.observation_space.n
action_space_size = env.action_space.n

# 2. Initialize Q-table
Q_table = np.zeros((state_space_size, action_space_size))

# 3. Hyperparameters
learning_rate = 0.9      # Alpha (α)
discount_factor = 0.99   # Gamma (γ)
epsilon = 1.0            # For ε-greedy policy
max_epsilon = 1.0        # Max exploration probability
min_epsilon = 0.01       # Min exploration probability
decay_rate = 0.001       # Exponential decay rate for epsilon
num_episodes = 10000

# 4. Q-Learning Algorithm
rewards_per_episode = []

for episode in range(num_episodes):
    state = env.reset()[0] # Reset environment for a new episode
    done = False
    rewards_current_episode = 0

    for step in range(100): # Limit steps per episode to prevent infinite loops
        # Exploration-Exploitation Trade-off
        if np.random.uniform(0, 1) > epsilon:
            # Exploit: Choose action with max Q-value
            action = np.argmax(Q_table[state,:])
        else:
            # Explore: Choose random action
            action = env.action_space.sample()

        # Take action and observe new state and reward
        new_state, reward, done, _, _ = env.step(action)

        # Update Q-table (Bellman equation for Q-learning)
        Q_table[state, action] = Q_table[state, action] * (1 - learning_rate) + \
                                 learning_rate * (reward + discount_factor * np.max(Q_table[new_state, :]))

        state = new_state
        rewards_current_episode += reward

        if done:
            break

    # Epsilon decay
    epsilon = min_epsilon + (max_epsilon - min_epsilon) * np.exp(-decay_rate * episode)
    rewards_per_episode.append(rewards_current_episode)

# 5. Evaluate (optional, you can print Q_table or plot rewards)
print("\n--- Training Complete ---")
print("Final Q-table:")
print(Q_table)

# Plot rewards over time
# import matplotlib.pyplot as plt
# plt.plot(rewards_per_episode)
# plt.xlabel("Episode")
# plt.ylabel("Total Reward")
# plt.title("Rewards per Episode during Training")
# plt.show()

# Test the learned policy
print("\n--- Testing Learned Policy ---")
test_episodes = 5
for _ in range(test_episodes):
    state = env.reset()[0]
    done = False
    print(f"\nEpisode {_ + 1}:")
    while not done:
        action = np.argmax(Q_table[state,:]) # Use learned policy (exploitation only)
        new_state, reward, done, _, info = env.step(action)
        env.render() # Visualizing the path
        state = new_state
        if done:
            print(f"Goal reached: {'Yes' if reward > 0 else 'No'}")
            break
env.close()
```

## Learning Resources
*   **Book:** "Reinforcement Learning: An Introduction" by Richard S. Sutton and Andrew G. Barto (often called "Sutton & Barto"). This is the foundational text.
*   **Online Course:**
    *   **Coursera:** "Reinforcement Learning Specialization" by University of Alberta (taught by Martha White and Adam White, students of Sutton).
    *   **FreeCodeCamp:** Various YouTube tutorials on Q-learning, Deep Q-Networks (DQN).
*   **Libraries/Tools:**
    *   **OpenAI Gym:** A toolkit for developing and comparing reinforcement learning algorithms. Provides a wide variety of environments.
    *   **Stable Baselines3:** A set of reliable implementations of reinforcement learning algorithms in PyTorch, built on Gym.
*   **Blogs/Articles:** Medium articles, Towards Data Science, and OpenAI blog posts often provide excellent explanations and practical examples.

---

# [LANG: RU]
# Обучение с подкреплением
## Краткий ответ
Обучение с подкреплением (RL) — это парадигма машинного обучения, при которой "агент" учится принимать оптимальные решения, взаимодействуя со "средой". Агент получает "награды" или "штрафы" за свои "действия" и стремится найти "политику" — стратегию, которая максимизирует совокупную награду с течением времени, без явного программирования для каждого возможного сценария.

## Ключевые понятия
*   **Агент (Agent):** Обучающийся или принимающий решения субъект.
*   **Среда (Environment):** Все, что находится вне агента и с чем он взаимодействует.
*   **Состояние (State, S):** Полное описание текущей ситуации в среде.
*   **Действие (Action, A):** Ход или решение, принятое агентом в среде.
*   **Награда (Reward, R):** Числовой сигнал обратной связи от среды, указывающий на желательность действия, предпринятого из данного состояния. Цель агента — максимизировать совокупную награду.
*   **Политика (Policy, π):** Отображение состояний в действия, определяющее поведение агента.
*   **Функция ценности (Value Function, V или Q):** Прогнозирование будущих наград, используемое для оценки того, насколько хорошо состояние или действие, предпринятое из состояния.
    *   **Функция ценности состояния (State-Value Function, V(s)):** Ожидаемая отдача, начиная из состояния `s` и следуя политике `π`.
    *   **Функция ценности действия (Action-Value Function, Q(s, a)):** Ожидаемая отдача, начиная из состояния `s`, выполняя действие `a`, а затем следуя политике `π`.
*   **Модель (Model):** Опциональный компонент, который имитирует поведение среды, предсказывая следующее состояние и награду при текущем состоянии и действии.
*   **Исследование против использования (Exploration vs. Exploitation):** Дилемма между попытками новых, потенциально лучших действий (исследование) и придерживанием известных хороших действий (использование).

## Основные идеи
1.  **Цикл взаимодействия Агента и Среды:** Обучение с подкреплением работает через непрерывный цикл. На каждом временном шаге агент наблюдает текущее состояние среды, выбирает действие в соответствии со своей политикой, выполняет это действие, а затем среда переходит в новое состояние и выдает сигнал награды. Этот цикл обратной связи позволяет агенту учиться.
2.  **Целевое обучение:** В отличие от обучения с учителем, которое учится на размеченных данных, или обучения без учителя, которое находит закономерности, обучение с подкреплением стремится к целевому обучению. Конечная цель агента — найти оптимальную политику, которая максимизирует общую ожидаемую дисконтированную совокупную награду за время его существования в среде.
3.  **Оптимизация политики:** Суть RL заключается в поиске оптимальной политики (π*), которая определяет лучшее действие, которое следует предпринять в любом заданном состоянии. Это может быть достигнуто либо:
    *   **Методами, основанными на ценности:** Оценка функций ценности (Q или V) и вывод из них политики (например, Q-обучение, SARSA, Deep Q-Networks).
    *   **Методами, основанными на политике:** Прямой поиск оптимальной политики в пространстве политик (например, REINFORCE, Actor-Critic методы).
    *   **Моделе-ориентированными методами:** Построение или обучение модели среды для планирования и прогнозирования результатов.
4.  **Обучение с временными разностями (Temporal Difference Learning):** Многие алгоритмы RL, такие как Q-обучение и SARSA, используют обучение с временными разностями (TD). Методы TD учатся непосредственно из опыта, обновляя оценки ценности на основе других изученных оценок ценности, а не дожидаясь окончательных результатов. Это позволяет обучению происходить непрерывно и в средах с длинными последовательностями действий.
5.  **Марковские процессы принятия решений (Markov Decision Processes, MDPs):** Теоретическая основа большинства задач RL. MDP описывает среду, в которой состояния обладают свойством Маркова (будущее зависит только от текущего состояния, а не от прошлой истории). Он определяется состояниями, действиями, вероятностями переходов и наградами.

## Полезный пример кода
Этот пример на Python демонстрирует простой алгоритм Q-обучения для игрушечной среды (например, простая сетка мира или FrozenLake из OpenAI Gym).

```python
import numpy as np
import gym

# 1. Настройка среды
env = gym.make("FrozenLake-v1", is_slippery=False) # Используйте is_slippery=False для более простого старта
# env = gym.make("FrozenLake-v1") # Для более сложной, скользкой среды
state_space_size = env.observation_space.n
action_space_size = env.action_space.n

# 2. Инициализация Q-таблицы
Q_table = np.zeros((state_space_size, action_space_size))

# 3. Гиперпараметры
learning_rate = 0.9      # Альфа (α)
discount_factor = 0.99   # Гамма (γ)
epsilon = 1.0            # Для ε-жадной политики
max_epsilon = 1.0        # Максимальная вероятность исследования
min_epsilon = 0.01       # Минимальная вероятность исследования
decay_rate = 0.001       # Скорость экспоненциального затухания эпсилон
num_episodes = 10000

# 4. Алгоритм Q-обучения
rewards_per_episode = []

for episode in range(num_episodes):
    state = env.reset()[0] # Сброс среды для нового эпизода
    done = False
    rewards_current_episode = 0

    for step in range(100): # Ограничение шагов за эпизод, чтобы предотвратить бесконечные циклы
        # Компромисс между исследованием и использованием
        if np.random.uniform(0, 1) > epsilon:
            # Использование: Выберите действие с максимальным Q-значением
            action = np.argmax(Q_table[state,:])
        else:
            # Исследование: Выберите случайное действие
            action = env.action_space.sample()

        # Выполните действие и наблюдайте новое состояние и награду
        new_state, reward, done, _, _ = env.step(action)

        # Обновление Q-таблицы (уравнение Беллмана для Q-обучения)
        Q_table[state, action] = Q_table[state, action] * (1 - learning_rate) + \
                                 learning_rate * (reward + discount_factor * np.max(Q_table[new_state, :]))

        state = new_state
        rewards_current_episode += reward

        if done:
            break

    # Затухание эпсилон
    epsilon = min_epsilon + (max_epsilon - min_epsilon) * np.exp(-decay_rate * episode)
    rewards_per_episode.append(rewards_current_episode)

# 5. Оценка (необязательно, можно распечатать Q_table или построить график наград)
print("\n--- Обучение завершено ---")
print("Финальная Q-таблица:")
print(Q_table)

# Построение графика наград с течением времени
# import matplotlib.pyplot as plt
# plt.plot(rewards_per_episode)
# plt.xlabel("Эпизод")
# plt.ylabel("Общая награда")
# plt.title("Награды за эпизод во время обучения")
# plt.show()

# Тестирование обученной политики
print("\n--- Тестирование обученной политики ---")
test_episodes = 5
for _ in range(test_episodes):
    state = env.reset()[0]
    done = False
    print(f"\nЭпизод {_ + 1}:")
    while not done:
        action = np.argmax(Q_table[state,:]) # Используем обученную политику (только использование)
        new_state, reward, done, _, info = env.step(action)
        env.render() # Визуализация пути
        state = new_state
        if done:
            print(f"Цель достигнута: {'Да' if reward > 0 else 'Нет'}")
            break
env.close()
```

## Ресурсы для изучения
*   **Книга:** "Reinforcement Learning: An Introduction" Ричарда С. Саттона и Эндрю Г. Барто (часто называемая "Саттон и Барто"). Это фундаментальный текст.
*   **Онлайн-курсы:**
    *   **Coursera:** "Reinforcement Learning Specialization" от Университета Альберты (преподаватели Марта Уайт и Адам Уайт, ученики Саттона).
    *   **FreeCodeCamp:** Различные обучающие материалы на YouTube по Q-обучению, глубоким Q-сетям (DQN).
*   **Библиотеки/инструменты:**
    *   **OpenAI Gym:** Набор инструментов для разработки и сравнения алгоритмов обучения с подкреплением. Предоставляет широкий спектр сред.
    *   **Stable Baselines3:** Набор надежных реализаций алгоритмов обучения с подкреплением на PyTorch, построенный на Gym.
*   **Блоги/статьи:** Статьи на Medium, Towards Data Science и блоги OpenAI часто содержат отличные объяснения и практические примеры.

---

# [LANG: UZ]
# Mustahkamlash orqali o'qitish (Reinforcement Learning)
## Qisqa javob
Mustahkamlash orqali o'qitish (RL) — bu mashina o'rganishining bir paradigmasi bo'lib, unda "agent" "muhit" bilan o'zaro aloqada bo'lish orqali optimal qarorlar qabul qilishni o'rganadi. Agent o'zining "harakatlari" asosida "mukofotlar" yoki "jarimalar" oladi va vaqt o'tishi bilan yig'ilgan mukofotni maksimal darajaga yetkazadigan "siyosat" — strategiyani topishga intiladi, har bir mumkin bo'lgan stsenariy uchun aniq dasturlashsiz.

## Asosiy tushunchalar
*   **Agent:** O'rganuvchi yoki qaror qabul qiluvchi subyekt.
*   **Muhit (Environment):** Agent bilan o'zaro ta'sir qiladigan har qanday narsa.
*   **Holat (State, S):** Muhitdagi joriy vaziyatning to'liq tavsifi.
*   **Harakat (Action, A):** Agent tomonidan muhitda qilingan harakat yoki qabul qilingan qaror.
*   **Mukofot (Reward, R):** Muhitdan kelgan raqamli qayta aloqa signali, holatdan qilingan harakatning maqsadga muvofiqligini ko'rsatadi. Agentning maqsadi yig'ilgan mukofotni maksimal darajaga yetkazishdir.
*   **Siyosat (Policy, π):** Agentning xatti-harakatini belgilaydigan holatlardan harakatlarga xaritalash.
*   **Qiymat funksiyasi (Value Function, V or Q):** Kelajakdagi mukofotlarning prognozi bo'lib, holatning yoki holatdan qilingan harakatning qanchalik yaxshi ekanligini baholash uchun ishlatiladi.
    *   **Holat-Qiymat funksiyasi (State-Value Function, V(s)):** `s` holatidan boshlab va `π` siyosatiga amal qilingan holda kutilayotgan daromad.
    *   **Harakat-Qiymat funksiyasi (Action-Value Function, Q(s, a)):** `s` holatidan boshlab, `a` harakatini bajarib va keyin `π` siyosatiga amal qilingan holda kutilayotgan daromad.
*   **Model:** Muhitning xatti-harakatlarini taqlid qiluvchi, joriy holat va harakat berilganda keyingi holat va mukofotni bashorat qiluvchi ixtiyoriy komponent.
*   **Tadqiqot va Ekspluatatsiya (Exploration vs. Exploitation):** Yangi, potensial yaxshiroq harakatlarni sinab ko'rish (tadqiqot) va ma'lum yaxshi harakatlarga rioya qilish (ekspluatatsiya) o'rtasidagi dilemma.

## Asosiy g'oyalar tushuntirilgan
1.  **Agent-Muhit o'zaro ta'sir sikli:** RL uzluksiz tsikl orqali ishlaydi. Har bir vaqt qadamida agent muhitning joriy holatini kuzatadi, o'z siyosatiga ko'ra harakatni tanlaydi, bu harakatni bajaradi, so'ngra muhit yangi holatga o'tadi va mukofot signalini beradi. Bu qayta aloqa tsikli agentga o'rganish imkonini beradi.
2.  **Maqsadga yo'naltirilgan o'rganish:** Belgilangan ma'lumotlardan o'rganadigan nazoratli o'rganish yoki naqshlarni topadigan nazoratsiz o'rganishdan farqli o'laroq, RL maqsadga yo'naltirilgan o'rganishga intiladi. Agentning yakuniy maqsadi muhitdagi umri davomida umumiy kutilgan diskontlangan yig'ma mukofotni maksimal darajaga yetkazadigan optimal siyosatni topishdir.
3.  **Siyosatni optimallashtirish:** RLning asosini har qanday berilgan holatda eng yaxshi harakatni belgilaydigan optimal siyosatni (π*) topish tashkil etadi. Bunga quyidagilar orqali erishish mumkin:
    *   **Qiymatga asoslangan usullar:** Qiymat funksiyalarini (Q yoki V) baholash va ulardan siyosatni chiqarish (masalan, Q-learning, SARSA, Deep Q-Networks).
    *   **Siyosatga asoslangan usullar:** Siyosat fazosida optimal siyosatni bevosita qidirish (masalan, REINFORCE, Actor-Critic usullari).
    *   **Modelga asoslangan usullar:** Muhitning modelini qurish yoki o'rganish rejalashtirish va natijalarni bashorat qilish uchun.
4.  **Vaqtinchalik farq bilan o'rganish (Temporal Difference Learning):** Ko'pgina RL algoritmlari, masalan, Q-learning va SARSA, vaqtinchalik farq (TD) bilan o'rganishdan foydalanadi. TD usullari to'g'ridan-to'g'ri tajribadan o'rganadi, qiymat baholarini boshqa o'rganilgan qiymat baholariga asoslanib yangilaydi, yakuniy natijalarni kutmasdan. Bu o'rganishning doimiy ravishda va uzoq harakatlar ketma-ketligiga ega muhitlarda sodir bo'lishiga imkon beradi.
5.  **Markov qaror qabul qilish jarayonlari (Markov Decision Processes, MDPs):** Ko'pgina RL muammolarining nazariy asosini tashkil etadi. MDP holatlari Markov xususiyatiga ega bo'lgan muhitni tasvirlaydi (kelajak faqat joriy holatga bog'liq, o'tmish tarixiga emas). U holatlar, harakatlar, o'tish ehtimolliklari va mukofotlar bilan belgilanadi.

## Foydali kod misoli
Ushbu Python misoli o'yinchoq muhit uchun (masalan, oddiy panjara dunyosi yoki OpenAI Gym'dagi FrozenLake) oddiy Q-learning algoritmini ko'rsatadi.

```python
import numpy as np
import gym

# 1. Muhitni sozlash
env = gym.make("FrozenLake-v1", is_slippery=False) # Oddiy boshlash uchun is_slippery=False dan foydalaning
# env = gym.make("FrozenLake-v1") # Murakkabroq, sirpanchiq muhit uchun
state_space_size = env.observation_space.n
action_space_size = env.action_space.n

# 2. Q-jadvalini boshlash
Q_table = np.zeros((state_space_size, action_space_size))

# 3. Giperparametrlari
learning_rate = 0.9      # Alfa (α)
discount_factor = 0.99   # Gamma (γ)
epsilon = 1.0            # ε-ochko'z siyosat uchun
max_epsilon = 1.0        # Maksimal tadqiqot ehtimoli
min_epsilon = 0.01       # Minimal tadqiqot ehtimoli
decay_rate = 0.001       # Epsilonning eksponensial yemirilish tezligi
num_episodes = 10000

# 4. Q-Learning algoritmi
rewards_per_episode = []

for episode in range(num_episodes):
    state = env.reset()[0] # Yangi epizod uchun muhitni tiklash
    done = False
    rewards_current_episode = 0

    for step in range(100): # Cheksiz tsikllarni oldini olish uchun epizoddagi qadamlarni cheklash
        # Tadqiqot va ekspluatatsiya o'rtasidagi kelishuv
        if np.random.uniform(0, 1) > epsilon:
            # Ekspluatatsiya: Maksimal Q-qiymatga ega harakatni tanlash
            action = np.argmax(Q_table[state,:])
        else:
            # Tadqiqot: Tasodifiy harakatni tanlash
            action = env.action_space.sample()

        # Harakatni bajarish va yangi holat hamda mukofotni kuzatish
        new_state, reward, done, _, _ = env.step(action)

        # Q-jadvalini yangilash (Q-learning uchun Bellman tenglamasi)
        Q_table[state, action] = Q_table[state, action] * (1 - learning_rate) + \
                                 learning_rate * (reward + discount_factor * np.max(Q_table[new_state, :]))

        state = new_state
        rewards_current_episode += reward

        if done:
            break

    # Epsilonning yemirilishi
    epsilon = min_epsilon + (max_epsilon - min_epsilon) * np.exp(-decay_rate * episode)
    rewards_per_episode.append(rewards_current_episode)

# 5. Baholash (ixtiyoriy, Q_table ni chop etish yoki mukofotlar grafigini chizish mumkin)
print("\n--- Mashg'ulot tugallandi ---")
print("Yakuniy Q-jadvali:")
print(Q_table)

# Vaqt o'tishi bilan mukofotlarni chizish
# import matplotlib.pyplot as plt
# plt.plot(rewards_per_episode)
# plt.xlabel("Epizod")
# plt.ylabel("Umumiy mukofot")
# plt.title("Mashg'ulot davomidagi epizod uchun mukofotlar")
# plt.show()

# O'rganilgan siyosatni sinash
print("\n--- O'rganilgan siyosatni sinash ---")
test_episodes = 5
for _ in range(test_episodes):
    state = env.reset()[0]
    done = False
    print(f"\nEpizod {_ + 1}:")
    while not done:
        action = np.argmax(Q_table[state,:]) # O'rganilgan siyosatdan foydalanish (faqat ekspluatatsiya)
        new_state, reward, done, _, info = env.step(action)
        env.render() # Yo'lni vizuallashtirish
        state = new_state
        if done:
            print(f"Maqsadga erishildi: {'Ha' if reward > 0 else 'Yo'q'}")
            break
env.close()
```

## O'rganish resurslari
*   **Kitob:** Richard S. Sutton va Andrew G. Barto tomonidan yozilgan "Reinforcement Learning: An Introduction" (ko'pincha "Sutton & Barto" deb ataladi). Bu asosiy matn.
*   **Onlayn kurslar:**
    *   **Coursera:** Alberta universiteti tomonidan taklif qilingan "Reinforcement Learning Specialization" (Martha White va Adam White, Suttonning shogirdlari tomonidan o'qitiladi).
    *   **FreeCodeCamp:** Q-learning, Deep Q-Networks (DQN) bo'yicha turli YouTube qo'llanmalari.
*   **Kutubxonalar/Vositalar:**
    *   **OpenAI Gym:** Mustahkamlash orqali o'rganish algoritmlarini ishlab chiqish va taqqoslash uchun vositalar to'plami. Turli xil muhitlarni taqdim etadi.
    *   **Stable Baselines3:** PyTorch'da mustahkamlash orqali o'rganish algoritmlarining ishonchli implementatsiyalar to'plami, Gym ustiga qurilgan.
*   **Bloglar/Maqolalar:** Medium maqolalari, Towards Data Science va OpenAI blog postlari ko'pincha ajoyib tushuntirishlar va amaliy misollarni taqdim etadi.