import logging
from botocore.exceptions import ClientError
from iam_keys import list_keys, create_key, get_last_use

logging.basicConfig(level=logging.INFO)

if __name__ == '__main__':
    # Замініть 'your-user-name' на ім'я користувача, для якого ви хочете працювати з ключами.
    user_name = 'Oleksandr'

    try:
        # 1. Перелік ключів користувача
        keys = list_keys(user_name)
        print(f"Users {user_name}: {len(keys)}")
        for key in keys:
            print(f"Key ID: {key.id}, Status: {key.status}")

        # # 2. Створення нового ключа
        # new_key = create_key(user_name)
        # print(f"Новий ключ створено. Key ID: {new_key.id}")

        # 3. Отримання інформації про останнє використання нового ключа
        # last_use = get_last_use(new_key.id)
        # print("Інформація про останнє використання ключа:")
        # print(last_use)

    except ClientError as error:
        print(f"Error: {error}")
