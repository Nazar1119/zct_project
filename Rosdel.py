import csv
import os

def split_csv_by_tokens(file_path, max_tokens, output_folder):
    # Создаем папку для хранения разделенных файлов, если её нет
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Открываем исходный CSV-файл
    with open(file_path, 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        header = next(reader)  # Сохраняем заголовок
        rows = []
        token_count = 0
        part_num = 1

        for row in reader:
            # Подсчёт токенов в строке (упрощённо: длина строки)
            row_token_count = sum(len(cell) for cell in row)
            if token_count + row_token_count > max_tokens:
                # Сохраняем текущую часть в файл
                part_file_path = os.path.join(output_folder, f'{os.path.basename(file_path).replace(".csv", "")}_part_{part_num}.csv')
                with open(part_file_path, 'w', encoding='utf-8', newline='') as part_file:
                    writer = csv.writer(part_file)
                    writer.writerow(header)
                    writer.writerows(rows)
                print(f"Файл {part_file_path} создан.")
                rows = []
                token_count = 0
                part_num += 1

            rows.append(row)
            token_count += row_token_count

        # Сохранение оставшихся строк
        if rows:
            part_file_path = os.path.join(output_folder, f'{os.path.basename(file_path).replace(".csv", "")}_part_{part_num}.csv')
            with open(part_file_path, 'w', encoding='utf-8', newline='') as part_file:
                writer = csv.writer(part_file)
                writer.writerow(header)
                writer.writerows(rows)
            print(f"Файл {part_file_path} создан.")

# Пример использования
split_csv_by_tokens("data/megaGymDataset.csv", 8000, "datax")
